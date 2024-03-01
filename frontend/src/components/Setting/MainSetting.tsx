import Header from "../Header/Header";

function AccessKeyGenerator() {
  return (
    <div className="access-key-generator">
      <h3>Access Key</h3>
      <div className="generator">
        <p>
          The OrcaNet Name System (ONNS) provides cryptographic addresses for
          publishing updates to content that is expected to change over time.
          This feature requires your node to be online at least once a day to
          ensure ONNS records are kept alive on the public DHT.
        </p>
        <div className="key-box">
          <input
            type="text"
            className="access-key"
            defaultValue="CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI"
            placeholder="Enter Access Key"
          />
          <button>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default function MainSetting() {
  return (
    <div className="main-setting">
      <Header />
      <AccessKeyGenerator />
    </div>
  );
}
