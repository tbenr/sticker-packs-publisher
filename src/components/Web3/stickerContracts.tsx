/*** StickerMarket ***/

const StickerMarketABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_packId",
        "type": "uint256"
      },
      {
        "name": "_limit",
        "type": "uint256"
      }
    ],
    "name": "purgePack",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [

    ],
    "name": "snt",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [

    ],
    "name": "stickerType",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_packId",
        "type": "uint256"
      }
    ],
    "name": "generateToken",
    "outputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setBurnRate",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_price",
        "type": "uint256"
      },
      {
        "name": "_donate",
        "type": "uint256"
      },
      {
        "name": "_category",
        "type": "bytes4[]"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_contenthash",
        "type": "bytes"
      },
      {
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "registerPack",
    "outputs": [
      {
        "name": "packId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newController",
        "type": "address"
      }
    ],
    "name": "changeController",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [

    ],
    "name": "stickerPack",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_price",
        "type": "uint256"
      },
      {
        "name": "_donate",
        "type": "uint256"
      },
      {
        "name": "_category",
        "type": "bytes4[]"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_contenthash",
        "type": "bytes"
      }
    ],
    "name": "generatePack",
    "outputs": [
      {
        "name": "packId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_state",
        "type": "uint8"
      }
    ],
    "name": "setMarketState",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      },
      {
        "name": "_token",
        "type": "address"
      },
      {
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "receiveApproval",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setRegisterFee",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getTokenData",
    "outputs": [
      {
        "name": "category",
        "type": "bytes4[]"
      },
      {
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "name": "contenthash",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [

    ],
    "name": "state",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newController",
        "type": "address"
      }
    ],
    "name": "migrate",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "claimTokens",
    "outputs": [

    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_packId",
        "type": "uint256"
      },
      {
        "name": "_destination",
        "type": "address"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "buyToken",
    "outputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [

    ],
    "name": "controller",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_snt",
        "type": "address"
      },
      {
        "name": "_stickerPack",
        "type": "address"
      },
      {
        "name": "_stickerType",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_token",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_controller",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "ClaimedTokens",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "state",
        "type": "uint8"
      }
    ],
    "name": "MarketState",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "RegisterFee",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "BurnRate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "packId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "dataPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "contenthash",
        "type": "bytes"
      }
    ],
    "name": "Register",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "controller",
        "type": "address"
      }
    ],
    "name": "NewController",
    "type": "event"
  }
];


/*** StickerPack ***/


const StickerPackABI = [
  {
     "constant":true,
     "inputs":[
        {
           "name":"interfaceId",
           "type":"bytes4"
        }
     ],
     "name":"supportsInterface",
     "outputs":[
        {
           "name":"",
           "type":"bool"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        
     ],
     "name":"name",
     "outputs":[
        {
           "name":"",
           "type":"string"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"getApproved",
     "outputs":[
        {
           "name":"",
           "type":"address"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"to",
           "type":"address"
        },
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"approve",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        
     ],
     "name":"totalSupply",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"_owner",
           "type":"address"
        },
        {
           "name":"_packId",
           "type":"uint256"
        }
     ],
     "name":"generateToken",
     "outputs":[
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"from",
           "type":"address"
        },
        {
           "name":"to",
           "type":"address"
        },
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"transferFrom",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"owner",
           "type":"address"
        },
        {
           "name":"index",
           "type":"uint256"
        }
     ],
     "name":"tokenOfOwnerByIndex",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"_newController",
           "type":"address"
        }
     ],
     "name":"changeController",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"from",
           "type":"address"
        },
        {
           "name":"to",
           "type":"address"
        },
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"safeTransferFrom",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"index",
           "type":"uint256"
        }
     ],
     "name":"tokenByIndex",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"ownerOf",
     "outputs":[
        {
           "name":"",
           "type":"address"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"owner",
           "type":"address"
        }
     ],
     "name":"balanceOf",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        
     ],
     "name":"symbol",
     "outputs":[
        {
           "name":"",
           "type":"string"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        
     ],
     "name":"tokenCount",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"to",
           "type":"address"
        },
        {
           "name":"approved",
           "type":"bool"
        }
     ],
     "name":"setApprovalForAll",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "name":"tokenPackId",
     "outputs":[
        {
           "name":"",
           "type":"uint256"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"from",
           "type":"address"
        },
        {
           "name":"to",
           "type":"address"
        },
        {
           "name":"tokenId",
           "type":"uint256"
        },
        {
           "name":"_data",
           "type":"bytes"
        }
     ],
     "name":"safeTransferFrom",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"tokenURI",
     "outputs":[
        {
           "name":"",
           "type":"string"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":false,
     "inputs":[
        {
           "name":"_token",
           "type":"address"
        }
     ],
     "name":"claimTokens",
     "outputs":[
        
     ],
     "payable":false,
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        {
           "name":"owner",
           "type":"address"
        },
        {
           "name":"operator",
           "type":"address"
        }
     ],
     "name":"isApprovedForAll",
     "outputs":[
        {
           "name":"",
           "type":"bool"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "constant":true,
     "inputs":[
        
     ],
     "name":"controller",
     "outputs":[
        {
           "name":"",
           "type":"address"
        }
     ],
     "payable":false,
     "stateMutability":"view",
     "type":"function"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "name":"from",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"to",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"Transfer",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "name":"owner",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"approved",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"tokenId",
           "type":"uint256"
        }
     ],
     "name":"Approval",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "name":"owner",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"operator",
           "type":"address"
        },
        {
           "indexed":false,
           "name":"approved",
           "type":"bool"
        }
     ],
     "name":"ApprovalForAll",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "name":"_token",
           "type":"address"
        },
        {
           "indexed":true,
           "name":"_controller",
           "type":"address"
        },
        {
           "indexed":false,
           "name":"_amount",
           "type":"uint256"
        }
     ],
     "name":"ClaimedTokens",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":false,
           "name":"controller",
           "type":"address"
        }
     ],
     "name":"NewController",
     "type":"event"
  }
]

/*** StickerType ***/

const StickerTypeABI =[
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_limit",
            "type":"uint256"
         }
      ],
      "name":"purgePack",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"interfaceId",
            "type":"bytes4"
         }
      ],
      "name":"supportsInterface",
      "outputs":[
         {
            "name":"",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         
      ],
      "name":"name",
      "outputs":[
         {
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"getApproved",
      "outputs":[
         {
            "name":"",
            "type":"address"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"to",
            "type":"address"
         },
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"approve",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         
      ],
      "name":"totalSupply",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"from",
            "type":"address"
         },
         {
            "name":"to",
            "type":"address"
         },
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"transferFrom",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"owner",
            "type":"address"
         },
         {
            "name":"index",
            "type":"uint256"
         }
      ],
      "name":"tokenOfOwnerByIndex",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_newController",
            "type":"address"
         }
      ],
      "name":"changeController",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"from",
            "type":"address"
         },
         {
            "name":"to",
            "type":"address"
         },
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"safeTransferFrom",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_price",
            "type":"uint256"
         },
         {
            "name":"_donate",
            "type":"uint256"
         },
         {
            "name":"_category",
            "type":"bytes4[]"
         },
         {
            "name":"_owner",
            "type":"address"
         },
         {
            "name":"_contenthash",
            "type":"bytes"
         }
      ],
      "name":"generatePack",
      "outputs":[
         {
            "name":"packId",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"index",
            "type":"uint256"
         }
      ],
      "name":"tokenByIndex",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         
      ],
      "name":"packCount",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"ownerOf",
      "outputs":[
         {
            "name":"",
            "type":"address"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_contenthash",
            "type":"bytes"
         }
      ],
      "name":"setPackContenthash",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"owner",
            "type":"address"
         }
      ],
      "name":"balanceOf",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         }
      ],
      "name":"getPackSummary",
      "outputs":[
         {
            "name":"category",
            "type":"bytes4[]"
         },
         {
            "name":"timestamp",
            "type":"uint256"
         },
         {
            "name":"contenthash",
            "type":"bytes"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_price",
            "type":"uint256"
         },
         {
            "name":"_donate",
            "type":"uint256"
         }
      ],
      "name":"setPackPrice",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         
      ],
      "name":"symbol",
      "outputs":[
         {
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         }
      ],
      "name":"getPaymentData",
      "outputs":[
         {
            "name":"owner",
            "type":"address"
         },
         {
            "name":"mintable",
            "type":"bool"
         },
         {
            "name":"price",
            "type":"uint256"
         },
         {
            "name":"donate",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_category",
            "type":"bytes4"
         }
      ],
      "name":"getCategoryLength",
      "outputs":[
         {
            "name":"size",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"to",
            "type":"address"
         },
         {
            "name":"approved",
            "type":"bool"
         }
      ],
      "name":"setApprovalForAll",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_category",
            "type":"bytes4"
         }
      ],
      "name":"addPackCategory",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_category",
            "type":"bytes4"
         }
      ],
      "name":"getAvailablePacks",
      "outputs":[
         {
            "name":"availableIds",
            "type":"uint256[]"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_category",
            "type":"bytes4"
         },
         {
            "name":"_index",
            "type":"uint256"
         }
      ],
      "name":"getCategoryPack",
      "outputs":[
         {
            "name":"packId",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_mintable",
            "type":"bool"
         }
      ],
      "name":"setPackState",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "name":"packs",
      "outputs":[
         {
            "name":"mintable",
            "type":"bool"
         },
         {
            "name":"timestamp",
            "type":"uint256"
         },
         {
            "name":"price",
            "type":"uint256"
         },
         {
            "name":"donate",
            "type":"uint256"
         },
         {
            "name":"contenthash",
            "type":"bytes"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"from",
            "type":"address"
         },
         {
            "name":"to",
            "type":"address"
         },
         {
            "name":"tokenId",
            "type":"uint256"
         },
         {
            "name":"_data",
            "type":"bytes"
         }
      ],
      "name":"safeTransferFrom",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"tokenURI",
      "outputs":[
         {
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         }
      ],
      "name":"getPackData",
      "outputs":[
         {
            "name":"category",
            "type":"bytes4[]"
         },
         {
            "name":"owner",
            "type":"address"
         },
         {
            "name":"mintable",
            "type":"bool"
         },
         {
            "name":"timestamp",
            "type":"uint256"
         },
         {
            "name":"price",
            "type":"uint256"
         },
         {
            "name":"contenthash",
            "type":"bytes"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_token",
            "type":"address"
         }
      ],
      "name":"claimTokens",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_packId",
            "type":"uint256"
         },
         {
            "name":"_category",
            "type":"bytes4"
         }
      ],
      "name":"removePackCategory",
      "outputs":[
         
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"owner",
            "type":"address"
         },
         {
            "name":"operator",
            "type":"address"
         }
      ],
      "name":"isApprovedForAll",
      "outputs":[
         {
            "name":"",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         
      ],
      "name":"controller",
      "outputs":[
         {
            "name":"",
            "type":"address"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"dataPrice",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"contenthash",
            "type":"bytes"
         },
         {
            "indexed":false,
            "name":"mintable",
            "type":"bool"
         }
      ],
      "name":"Register",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"dataPrice",
            "type":"uint256"
         }
      ],
      "name":"PriceChanged",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"mintable",
            "type":"bool"
         }
      ],
      "name":"MintabilityChanged",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"packid",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"contenthash",
            "type":"bytes"
         }
      ],
      "name":"ContenthashChanged",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"category",
            "type":"bytes4"
         },
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         }
      ],
      "name":"Categorized",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"category",
            "type":"bytes4"
         },
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         }
      ],
      "name":"Uncategorized",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"packId",
            "type":"uint256"
         }
      ],
      "name":"Unregister",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"from",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"to",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"Transfer",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"owner",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"approved",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"tokenId",
            "type":"uint256"
         }
      ],
      "name":"Approval",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"owner",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"operator",
            "type":"address"
         },
         {
            "indexed":false,
            "name":"approved",
            "type":"bool"
         }
      ],
      "name":"ApprovalForAll",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "name":"_token",
            "type":"address"
         },
         {
            "indexed":true,
            "name":"_controller",
            "type":"address"
         },
         {
            "indexed":false,
            "name":"_amount",
            "type":"uint256"
         }
      ],
      "name":"ClaimedTokens",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":false,
            "name":"controller",
            "type":"address"
         }
      ],
      "name":"NewController",
      "type":"event"
   }
]


interface TAddresses {
  [key: number]: string
}
const StickerMarketAddresses: TAddresses = {
  1: "0x12824271339304d3a9f7e096e62a2a7e73b4a7e7",
  3: "0x6CC7274aF9cE9572d22DFD8545Fb8c9C9Bcb48AD",
  4: "0x6CC7274aF9cE9572d22DFD8545Fb8c9C9Bcb48AD",
  5: "0x6CC7274aF9cE9572d22DFD8545Fb8c9C9Bcb48AD"
}

const StickerPackAddresses: TAddresses = {
  1: "0x110101156e8F0743948B2A61aFcf3994A8Fb172e",
  3: "0xf852198D0385c4B871E0B91804ecd47C6bA97351",
  4: "0xf852198D0385c4B871E0B91804ecd47C6bA97351",
  5: "0xf852198D0385c4B871E0B91804ecd47C6bA97351"
}

const StickerTypeAddresses: TAddresses = {
   1: "0x0577215622f43a39f4bc9640806dfea9b10d2a36",
   3: "0x8cc272396Be7583c65BEe82CD7b743c69A87287D",
   4: "0x8cc272396Be7583c65BEe82CD7b743c69A87287D",
   5: "0x8cc272396Be7583c65BEe82CD7b743c69A87287D"
 }

export { StickerMarketABI, StickerPackABI, StickerTypeABI, StickerMarketAddresses, StickerPackAddresses, StickerTypeAddresses}