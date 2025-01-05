import CryptoJS from 'crypto-js'
import { HDNodeWallet, hexlify, getBytes, Mnemonic, randomBytes, computeHmac } from 'ethers'
import nacl from 'tweetnacl'
import dayjs from 'dayjs'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface MostWallet {
  username: string
  address: string
  mnemonic: string
  public_key: string
  private_key: string
}
export const wallet = (username: string, password: string): MostWallet => {
  const p = CryptoJS.enc.Utf8.parse(password)
  const salt = CryptoJS.enc.Utf8.parse('/most.box/' + username)
  const kdf = CryptoJS.PBKDF2(p.toString(CryptoJS.enc.Hex), salt, {
    keySize: 256 / 32,
    iterations: 3,
    hasher: CryptoJS.algo.SHA512,
  })

  const privateKey = CryptoJS.SHA256(kdf).toString(CryptoJS.enc.Hex)

  // Generate x25519 key pair using tweetnacl
  const seed = getBytes('0x' + privateKey).slice(0, 32)
  const keyPair = nacl.box.keyPair.fromSecretKey(seed)

  const public_key = hexlify(keyPair.publicKey)
  const private_key = hexlify(keyPair.secretKey)

  // wallet all in one
  const mnemonic = Mnemonic.entropyToPhrase(getBytes('0x' + privateKey))
  const wallet = HDNodeWallet.fromPhrase(mnemonic)
  const address = wallet.address

  const mostWallet: MostWallet = {
    username,
    address,
    mnemonic,
    public_key,
    private_key,
  }
  return mostWallet
}
