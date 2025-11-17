'use client';
async function callContract() {
if (!contractAddr) return alert('Adresse du contrat manquante');
if (!window.ethereum) return alert('MetaMask requis');


try {
await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const abi = [
"function computeVolume(uint256,uint256,uint256) public pure returns (uint256,uint256)"
];


const contract = new ethers.Contract(contractAddr, abi, signer);


const l = toMM(length, unit);
const w = toMM(width, unit);
const h = toMM(height, unit);


const res = await contract.computeVolume(l, w, h);
const m3 = formatScaledM3(res[1]);


setResult({
vmm3: res[0].toString(),
scaled: res[1].toString(),
m3
});
} catch (e) {
alert("Erreur : " + e.message);
}
}


return (
<main style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>


<h1>Calculateur de Volume (m³)</h1>


<label>Unité :</label><br />
<select value={unit} onChange={(e) => setUnit(e.target.value)}>
<option value="m">m</option>
<option value="cm">cm</option>
<option value="mm">mm</option>
</select>


<div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
<input placeholder="Longueur" value={length} onChange={e => setLength(e.target.value)} />
<input placeholder="Largeur" value={width} onChange={e => setWidth(e.target.value)} />
<input placeholder="Hauteur" value={height} onChange={e => setHeight(e.target.value)} />
</div>


<input style={{ width: '100%', marginTop: 10 }} placeholder="Adresse du contrat (optionnel)" value={contractAddr} onChange={e => setContractAddr(e.target.value)} />


<div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
<button onClick={localCompute}>Calcul local</button>
<button onClick={callContract}>Appeler contrat</button>
</div>


{result && (
<div style={{ marginTop: 20 }}>
<h3>Résultats</h3>
<p>Volume (mm³) : {result.vmm3}</p>
<p>Volume (m³) : {result.m3}</p>
<p>Scaled (18 décimales) : {result.scaled}</p>
</div>
)}


</main>
);
}
