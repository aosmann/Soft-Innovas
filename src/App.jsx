import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [imageText, setImageText] = useState('');
  const [generatedImageURL, setGeneratedImageURL] = useState('');

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }
  }, []);

  const speakText = () => {
    if (selectedVoice && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      speechSynthesis.speak(utterance);
    } else {
      alert("Please select a voice and enter text for speech.");
    }
  };

  const generateImage = () => {
    if (imageText) {
      // Placeholder image generation - replace with actual API call if available
      setGeneratedImageURL(`https://placekitten.com/300/300?text=${encodeURIComponent(imageText)}`);
    } else {
      alert("Please enter text for image generation.");
    }
  };

  return (
    <div className="container">
      <h1>AI Text-to-Speech & Image Bot</h1>

      <section className="speech-section">
        <h2>Text-to-Speech</h2>
        <div className="input-area">
          <textarea
            rows="5"
            cols="50"
            placeholder="Enter text to speak"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="voice-selector">
          <label htmlFor="voiceSelect">Select Voice Model:</label>
          <select
            id="voiceSelect"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
          >
            <option value="">-- Select Voice --</option>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        <div className="controls">
          <div className="control-item">
            <label htmlFor="rate">Rate:</label>
            <input
              type="range"
              id="rate"
              min="0.1"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
            <span>{rate}</span>
          </div>
          <div className="control-item">
            <label htmlFor="pitch">Pitch:</label>
            <input
              type="range"
              id="pitch"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
            />
            <span>{pitch}</span>
          </div>
        </div>
        <button onClick={speakText}>Speak Text</button>
      </section>

      <section className="image-section">
        <h2>Text-to-Image</h2>
        <div className="input-area">
          <textarea
            rows="5"
            cols="50"
            placeholder="Enter text for image"
            value={imageText}
            onChange={(e) => setImageText(e.target.value)}
          />
        </div>
        <button onClick={generateImage}>Generate Image</button>
        {generatedImageURL && (
          <div className="image-output">
            <img src={generatedImageURL} alt="Generated Image" />
          </div>
        )}
      </section>

      <p className="note">Note: Voice quality and realism depend on the browser's Speech Synthesis API and the selected voice model. Rate and pitch adjustments offer limited control over voice characteristics. Text-to-Image is a placeholder and uses a static image service.</p>
    </div>
  );
}

export default App;
