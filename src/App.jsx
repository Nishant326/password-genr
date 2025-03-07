import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [cahrAllowed, setCharAllowed] = useState(false);
  const [Passworde, setPassowrd] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwwxyz";
    if (numberAllowed) str += "0123456789";
    if (cahrAllowed) str += "@ # $ % & * + = ? ...";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    };
    setPassowrd(pass);
  }, [length,numberAllowed, cahrAllowed, setPassowrd])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(Passworde)

  }, [Passworde])



  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, cahrAllowed, passwordGenerator]
  )
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 '>
        <h1 className="text-center text-white my-3">Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={Passworde}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}

          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
                defaultValue={cahrAllowed}
                id='characterInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="CharcterINput">character</label>

            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
