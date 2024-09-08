import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [len, setLen] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState('');
  const [copy, setCopy] = useState('Copy');

  const passRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (isNum) str += '0123456789';
    if (isChar) str += '!@#$%^&*()';

    for (let i = 0; i < len; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
    setCopy('Copy'); 
  }, [len, isChar, isNum , setPassword ]);

  const copypass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy('Copied'); 
  }, [password]);

  useEffect(() => {
    passGen();
  }, [passGen]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-orange-500 mb-6">
          Password Generator
        </h1>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={password}
            readOnly
            ref={passRef}
            className="w-full p-2 text-center bg-gray-700 text-white text-xl rounded-md outline-none"
            placeholder="Generated Password"
          />
          <button
            className="rounded-md bg-orange-500 p-2 ml-2 text-white hover:bg-orange-600 transition"
            onClick={copypass}
          >
            {copy}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-white">Length: {len}</label>
          <input
            type="range"
            min="4"
            max="20"
            value={len}
            onChange={(e) => setLen(Number(e.target.value))}
            className="w-2/3"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-white">Include Numbers</label>
          <input
            type="checkbox"
            checked={isNum}
            onChange={(e) => setIsNum(e.target.checked)}
            className="accent-orange-500"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="text-white">Include Special Characters</label>
          <input
            type="checkbox"
            checked={isChar}
            onChange={(e) => setIsChar(e.target.checked)}
            className="accent-orange-500"
          />
        </div>

        <button
          onClick={passGen}
          className="w-full p-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
