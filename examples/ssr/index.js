const express = require('express')
const Muon = require('muon')

const port = 3050
const app = express()

app.get('*', async (req, res) => {
  const MuonBridge_ABI = [
    {
      inputs: [{ internalType: 'address', name: '_muon', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'addr',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'mintable',
          type: 'bool'
        }
      ],
      name: 'AddToken',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'fromChain',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'txId',
          type: 'uint256'
        }
      ],
      name: 'Claim',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'txId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'toChain',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        }
      ],
      name: 'Deposit',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
        { internalType: 'string', name: '_name', type: 'string' },
        { internalType: 'string', name: '_symbol', type: 'string' },
        { internalType: 'uint8', name: '_decimals', type: 'uint8' },
        { internalType: 'bytes', name: '_reqId', type: 'bytes' },
        { internalType: 'bytes[]', name: '_sigs', type: 'bytes[]' }
      ],
      name: 'addBridgeToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_tokenContract', type: 'address' }
      ],
      name: 'addMainToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'user', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'fromChain', type: 'uint256' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'txId', type: 'uint256' },
        { internalType: 'bytes', name: '_reqId', type: 'bytes' },
        { internalType: 'bytes[]', name: 'sigs', type: 'bytes[]' }
      ],
      name: 'claim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'claimedTxs',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'deposit',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'user', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'depositFor',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_tokenAddr', type: 'address' },
        { internalType: 'address', name: '_to', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' }
      ],
      name: 'emergencyWithdrawERC20Tokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'address', name: 'addr', type: 'address' }
      ],
      name: 'emergencyWithdrawETH',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getExecutingChainID',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
      name: 'getTokenId',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_txId', type: 'uint256' }],
      name: 'getTx',
      outputs: [
        { internalType: 'uint256', name: 'txId', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'fromChain', type: 'uint256' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' },
        { internalType: 'address', name: 'user', type: 'address' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'user', type: 'address' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' }
      ],
      name: 'getUserTxs',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'ids',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'mintable',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'network',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
        {
          internalType: 'address',
          name: '_tokenContract',
          type: 'address'
        },
        { internalType: 'bool', name: '_mintable', type: 'bool' }
      ],
      name: 'ownerAddToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
        { internalType: 'bool', name: '_mintable', type: 'bool' }
      ],
      name: 'ownerSetMintable',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_network', type: 'uint256' }],
      name: 'ownerSetNetworkID',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_network', type: 'uint256' },
        { internalType: 'address', name: '_addr', type: 'address' }
      ],
      name: 'ownerSetSideContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'fromChain', type: 'uint256' },
        { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' }
      ],
      name: 'pendingTxs',
      outputs: [
        { internalType: 'bool[]', name: 'unclaimedIds', type: 'bool[]' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'sideContracts',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'tokens',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'txs',
      outputs: [
        { internalType: 'uint256', name: 'txId', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'fromChain', type: 'uint256' },
        { internalType: 'uint256', name: 'toChain', type: 'uint256' },
        { internalType: 'address', name: 'user', type: 'address' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'userTxs',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }
  ]
  const muon = new Muon('http://104.131.177.195:8080/v1', 3)
  const result = await muon.apps.eth.addBridgeToken(
    '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
    'bsctest',
    'rinkeby'
  )

  const resultCall = await muon.apps.eth.callContract(
    '0xa360Ba73440aF250F462fb67fB691206d7dC9556',
    'getTx',
    [1],
    MuonBridge_ABI,
    'rinkeby'
  )
  const data = JSON.stringify(result, undefined, 2)
  const responseCall = JSON.stringify(resultCall, undefined, 2)

  const output = ` <h2>Signatures Reponse Add Bridge When Is Used In Node :</h2>
  <pre id="json">${data}</pre>
  <h2>Signatures Reponse Call Contract When Is Used In Node :</h2>
  <pre id="json">${responseCall}</pre>`
  res.send(output)
})

app.listen(port, () => console.log(`http://localhost:${port}`))
