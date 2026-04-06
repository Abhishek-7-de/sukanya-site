import { playlist } from '../data/siteData';

export default function PlaylistShelf() {
  return (
    <div className="card card-dark">
      <p className="eyebrow eyebrow-dark">playlist shelf</p>
      <h3 className="card-title dark-title">Songs for every version of your day</h3>
      <div className="stack-list">
        {playlist.map((track) => (
          <div key={track.title} className="dark-list-item">
            <div>
              <p className="dark-list-title">{track.title}</p>
              <p className="dark-list-subtitle">Mood: {track.mood}</p>
            </div>
            <span className="dark-list-icon">♫</span>
          </div>
        ))}
      </div>
    </div>
  );
}
