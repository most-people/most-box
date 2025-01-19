import { HDNodeWallet, hexlify, getBytes, Mnemonic, pbkdf2, sha256, toUtf8Bytes } from 'ethers'
import nacl from 'tweetnacl'

export interface MostWallet {
  username: string
  address: string
  mnemonic: string
  public_key: string
  private_key: string
}

const getPrivateKey = (username: string, password: string) => {
  const p = toUtf8Bytes(password)
  const salt = toUtf8Bytes('/most.box/' + username)
  const kdf = pbkdf2(p, salt, 3, 32, 'sha512')
  const privateKey = sha256(kdf)
  return privateKey
}

export const mostAddress = (username: string, password: string) => {
  if (!username || !password) return
  const privateKey = getPrivateKey(username, password)
  const mnemonic = Mnemonic.entropyToPhrase(getBytes(privateKey))
  const wallet = HDNodeWallet.fromPhrase(mnemonic)
  return wallet.address
}
export const mostWallet = (username: string, password: string): MostWallet => {
  const privateKey = getPrivateKey(username, password)

  // x25519 key pair
  const seed = getBytes(privateKey).slice(0, 32)
  const keyPair = nacl.box.keyPair.fromSecretKey(seed)

  const public_key = hexlify(keyPair.publicKey)
  const private_key = hexlify(keyPair.secretKey)

  // wallet all in one
  const mnemonic = Mnemonic.entropyToPhrase(getBytes(privateKey))
  const wallet = HDNodeWallet.fromPhrase(mnemonic)

  const mostWallet: MostWallet = {
    username,
    address: wallet.address,
    mnemonic,
    public_key,
    private_key,
  }
  return mostWallet
}
