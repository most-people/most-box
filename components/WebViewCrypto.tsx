import React, { useRef, useEffect, useCallback } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Crypto from 'expo-crypto'

// @ts-ignore
window.crypto.getRandomBytes = Crypto.getRandomBytes
// @ts-ignore
window.crypto.getRandomBytesAsync = Crypto.getRandomBytesAsync
// @ts-ignore
window.crypto.getRandomValues = Crypto.getRandomValues

const TIMEOUT_MS = 10000

type KeyUsage =
  | 'encrypt'
  | 'decrypt'
  | 'sign'
  | 'verify'
  | 'deriveKey'
  | 'deriveBits'
  | 'wrapKey'
  | 'unwrapKey'
type KeyFormat = 'raw' | 'pkcs8' | 'spki' | 'jwk'

interface CryptoOperation {
  id: string
  method: string
  params: any[]
}

export const WebViewCrypto = () => {
  const webviewRef = useRef<WebView>(null)
  const promiseRef = useRef<{
    resolve: (value: any) => void
    reject: (reason: any) => void
    timeoutId: NodeJS.Timeout
    id: string
  } | null>(null)
  const readyRef = useRef(false)

  const cleanup = useCallback(() => {
    if (promiseRef.current?.timeoutId) {
      clearTimeout(promiseRef.current.timeoutId)
    }
    promiseRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  const executeOperation = useCallback(
    async (method: string, ...params: any[]): Promise<any> => {
      if (!readyRef.current) {
        throw new Error('WebView is not ready')
      }

      return new Promise((resolve, reject) => {
        const id = Math.random().toString(36).substr(2, 9)
        const timeoutId = setTimeout(() => {
          cleanup()
          reject(new Error('Operation timed out'))
        }, TIMEOUT_MS)

        promiseRef.current = { resolve, reject, timeoutId, id }

        const operation: CryptoOperation = {
          id,
          method,
          params,
        }

        const injectScript = `
        (async function() {
          try {
            const operation = ${JSON.stringify(operation)};
            let result;

            switch (operation.method) {
              case 'encrypt':
              case 'decrypt': {
                const [algorithm, key, data] = operation.params;
                const buffer = new Uint8Array(data).buffer;
                result = await window.crypto.subtle[operation.method](algorithm, key, buffer);
                result = Array.from(new Uint8Array(result));
                break;
              }

              case 'deriveBits':
              case 'deriveKey': {
                const [algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages] = operation.params;
                result = await window.crypto.subtle[operation.method](
                  algorithm,
                  baseKey,
                  operation.method === 'deriveBits' ? derivedKeyAlgorithm : { length: derivedKeyAlgorithm },
                  extractable,
                  keyUsages
                );
                if (operation.method === 'deriveBits') {
                  result = Array.from(new Uint8Array(result));
                } else {
                  const jwk = await window.crypto.subtle.exportKey('jwk', result);
                  result = {
                    type: result.type,
                    extractable: result.extractable,
                    algorithm: result.algorithm,
                    usages: result.usages,
                    jwk
                  };
                }
                break;
              }

              case 'digest': {
                const [algorithm, data] = operation.params;
                const buffer = new Uint8Array(data).buffer;
                result = await window.crypto.subtle.digest(algorithm, buffer);
                result = Array.from(new Uint8Array(result));
                break;
              }

              case 'generateKey': {
                const [algorithm, extractable, keyUsages] = operation.params;
                const key = await window.crypto.subtle.generateKey(algorithm, extractable, keyUsages);
                
                if (key.publicKey && key.privateKey) {
                  const publicJwk = await window.crypto.subtle.exportKey('jwk', key.publicKey);
                  const privateJwk = await window.crypto.subtle.exportKey('jwk', key.privateKey);
                  
                  result = {
                    publicKey: {
                      type: 'public',
                      extractable,
                      algorithm: key.publicKey.algorithm,
                      usages: keyUsages.filter(usage => ['verify', 'encrypt', 'wrapKey'].includes(usage)),
                      jwk: publicJwk
                    },
                    privateKey: {
                      type: 'private',
                      extractable,
                      algorithm: key.privateKey.algorithm,
                      usages: keyUsages.filter(usage => ['sign', 'decrypt', 'unwrapKey', 'deriveKey', 'deriveBits'].includes(usage)),
                      jwk: privateJwk
                    }
                  };
                } else {
                  const jwk = await window.crypto.subtle.exportKey('jwk', key);
                  result = {
                    type: key.type,
                    extractable,
                    algorithm: key.algorithm,
                    usages: keyUsages,
                    jwk
                  };
                }
                break;
              }

              case 'exportKey': {
                const [format, key] = operation.params;
                result = await window.crypto.subtle.exportKey(format, key);
                if (format !== 'jwk') {
                  result = Array.from(new Uint8Array(result));
                }
                break;
              }

              case 'importKey': {
                const [format, keyData, algorithm, extractable, keyUsages] = operation.params;
                const key = await window.crypto.subtle.importKey(
                  format,
                  format === 'jwk' ? keyData : new Uint8Array(keyData).buffer,
                  algorithm,
                  extractable,
                  keyUsages
                );
                const jwk = await window.crypto.subtle.exportKey('jwk', key);
                result = {
                  type: key.type,
                  extractable,
                  algorithm: key.algorithm,
                  usages: keyUsages,
                  jwk
                };
                break;
              }

              case 'sign':
              case 'verify': {
                const [algorithm, key, data] = operation.params;
                const buffer = new Uint8Array(data).buffer;
                if (operation.method === 'sign') {
                  result = await window.crypto.subtle.sign(algorithm, key, buffer);
                  result = Array.from(new Uint8Array(result));
                } else {
                  result = await window.crypto.subtle.verify(algorithm, key, buffer);
                }
                break;
              }

              case 'wrapKey':
              case 'unwrapKey': {
                const [format, key, wrappingKey, algorithm] = operation.params;
                if (operation.method === 'wrapKey') {
                  result = await window.crypto.subtle.wrapKey(format, key, wrappingKey, algorithm);
                  result = Array.from(new Uint8Array(result));
                } else {
                  const [extractable, keyUsages] = operation.params.slice(4);
                  result = await window.crypto.subtle.unwrapKey(
                    format,
                    new Uint8Array(key).buffer,
                    wrappingKey,
                    algorithm,
                    extractable,
                    keyUsages
                  );
                  const jwk = await window.crypto.subtle.exportKey('jwk', result);
                  result = {
                    type: result.type,
                    extractable,
                    algorithm: result.algorithm,
                    usages: keyUsages,
                    jwk
                  };
                }
                break;
              }
            }

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'result',
              id: operation.id,
              data: result
            }));
          } catch (error) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'error',
              id: operation.id,
              message: error.message
            }));
          }
        })();
        true;
      `
        webviewRef.current?.injectJavaScript(injectScript)
      })
    },
    [cleanup],
  )

  // 实现所有的 subtle crypto 方法
  const subtle = {
    encrypt: (algorithm: any, key: CryptoKey, data: BufferSource) =>
      executeOperation('encrypt', algorithm, key, Array.from(new Uint8Array(data as ArrayBuffer))),

    decrypt: (algorithm: any, key: CryptoKey, data: BufferSource) =>
      executeOperation('decrypt', algorithm, key, Array.from(new Uint8Array(data as ArrayBuffer))),

    deriveBits: (algorithm: any, baseKey: CryptoKey, length: number) =>
      executeOperation('deriveBits', algorithm, baseKey, length),

    deriveKey: (
      algorithm: any,
      baseKey: CryptoKey,
      derivedKeyType: any,
      extractable: boolean,
      keyUsages: KeyUsage[],
    ) => executeOperation('deriveKey', algorithm, baseKey, derivedKeyType, extractable, keyUsages),

    digest: (algorithm: any, data: BufferSource) =>
      executeOperation('digest', algorithm, Array.from(new Uint8Array(data as ArrayBuffer))),

    generateKey: (algorithm: any, extractable: boolean, keyUsages: KeyUsage[]) =>
      executeOperation('generateKey', algorithm, extractable, keyUsages),

    exportKey: (format: KeyFormat, key: CryptoKey) => executeOperation('exportKey', format, key),

    importKey: (
      format: KeyFormat,
      keyData: JsonWebKey | BufferSource,
      algorithm: any,
      extractable: boolean,
      keyUsages: KeyUsage[],
    ) => executeOperation('importKey', format, keyData, algorithm, extractable, keyUsages),

    sign: (algorithm: any, key: CryptoKey, data: BufferSource) =>
      executeOperation('sign', algorithm, key, Array.from(new Uint8Array(data as ArrayBuffer))),

    verify: (algorithm: any, key: CryptoKey, signature: BufferSource, data: BufferSource) =>
      executeOperation('verify', algorithm, key, Array.from(new Uint8Array(data as ArrayBuffer))),

    wrapKey: (format: KeyFormat, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: any) =>
      executeOperation('wrapKey', format, key, wrappingKey, wrapAlgorithm),

    unwrapKey: (
      format: KeyFormat,
      wrappedKey: BufferSource,
      unwrappingKey: CryptoKey,
      unwrapAlgorithm: any,
      unwrappedKeyAlgorithm: any,
      extractable: boolean,
      keyUsages: KeyUsage[],
    ) =>
      executeOperation(
        'unwrapKey',
        format,
        Array.from(new Uint8Array(wrappedKey as ArrayBuffer)),
        unwrappingKey,
        unwrapAlgorithm,
        unwrappedKeyAlgorithm,
        extractable,
        keyUsages,
      ),
  }

  // 覆盖全局 crypto 对象
  window.crypto.subtle = subtle

  const handleMessage = useCallback(
    (event: any) => {
      try {
        const response = JSON.parse(event.nativeEvent.data)

        if (!promiseRef.current || response.id !== promiseRef.current.id) {
          return
        }

        if (response.type === 'error') {
          promiseRef.current.reject(new Error(response.message))
        } else if (response.type === 'result') {
          promiseRef.current.resolve(response.data)
        }

        cleanup()
      } catch (error) {
        if (promiseRef.current) {
          promiseRef.current.reject(error)
          cleanup()
        }
      }
    },
    [cleanup],
  )

  return (
    <View style={{ position: 'absolute', width: 0, height: 0 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://most.box/crypto.html' }}
        onLoadEnd={() => {
          readyRef.current = true
        }}
        onMessage={handleMessage}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          if (promiseRef.current) {
            promiseRef.current.reject(new Error(nativeEvent.description))
            cleanup()
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        thirdPartyCookiesEnabled={false}
      />
    </View>
  )
}
