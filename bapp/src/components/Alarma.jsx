import { useState, useEffect } from 'react';
import Sound from 'react-sound';

const Alarma = () => {
  const [alarma, setAlarma] = useState(false);

  useEffect(() => {
    const fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() + 1); // establece la alarma para dentro de 1 minuto

    const intervalo = setInterval(() => {
      if (new Date() >= fecha) {
        setAlarma(true);
        clearInterval(intervalo);
      }
    }, 1000);
  }, []);

  return (
    <div>
      {alarma && (
        <Sound
          url="alarma.mp3"
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      )}
    </div>
  );
};


export default Alarma;