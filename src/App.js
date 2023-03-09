import { useEffect, useState, useCallback } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';
import Spinner from './components/Spinner';
import './App.css';

// This and other URLs should be on an ENV, but for simplicity of the test I'll leave it here
const URL = "https://api.opensea.io/api/v1/assets?owner=";
const REGEX = "^0x[a-fA-F0-9]{40}$";

const App = () => {
  const [addressToSearch, setAddressToSearch] = useState('');
  const [assets, setAssets] = useState([]);
  const [assetSelected, setAssetSelected] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isEthereumAddress, setIsEthereumAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreAssets, setIsMoreAssets] = useState(false);

  const getList = useCallback(async () => {
    setIsLoading(true);
    return await fetch(URL+addressToSearch)
      .then(res => res.json())
      .catch(error => {
        console.error('Error:', error);
        setIsError(true);
      })
      .then(response => {
        setIsLoading(false);
        setIsMoreAssets(!!response?.next)
        setAssets(response?.assets || []);
      });
  }, [addressToSearch])

  useEffect(() => {
    setIsError(false);
    setIsMoreAssets(false);
    if (addressToSearch.match(REGEX)) {
      setIsEthereumAddress(true);
      getList();
    } else {
      setIsEthereumAddress(false);
      setAssets([]);
    }
  }, [addressToSearch, getList])

  return (
    <div className="App">
      <header className="header">
        <img src="https://www.alturanft.com/logo-svg.svg" alt="logo" />
        <p>Altura NFTs Explorer</p>
        <input
          className="search"
          onChange={e => setAddressToSearch(e.target.value)}
          placeholder="Insert Ethereum's Wallet Address"
        />
      </header>
      {assetSelected &&
        <Modal
          asset={assetSelected}
          onClose={() => setAssetSelected(null)}
        />
      }
      {isEthereumAddress && assets.length > 0 &&
        <div className='list'>
          {assets.map(asset => {
            return (
              <Card
                asset={asset}
                key={asset.id}
                onClick={() => setAssetSelected(asset)}
              />
            )
          })}
        </div>
      }
      {addressToSearch && !isEthereumAddress &&
        <p>This is not an Ethereum Address.</p>
      }
      {isLoading &&
        <Spinner/>
      }
      {isError &&
        <p>There is a problem with the server, please try again later.</p>
      }
      {isMoreAssets &&
        <p>This fetchs only 20 NFTs because of OpenSea's API limintations.</p>
      }
      {!isError && !isLoading && isEthereumAddress && assets.length === 0 &&
        <p>No assets on this wallet address.</p>
      }
    </div>
  );
}

export default App;
