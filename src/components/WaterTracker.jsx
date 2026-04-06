import { useMemo, useState } from 'react';

export default function WaterTracker() {
  const [waterCount, setWaterCount] = useState(0);

  const message = useMemo(() => {
    if (waterCount === 0) return 'Start with one glass. Your nervous system has filed a small but reasonable complaint.';
    if (waterCount < 3) return 'Better. The therapist is becoming less dependent on pure willpower.';
    if (waterCount < 5) return 'Hydrated. Functional. Mildly unstoppable.';
    return 'At this point, even your cells feel reassured.';
  }, [waterCount]);

  return (
    <div className="card card-soft">
      <p className="eyebrow">hydration checkpoint</p>
      <h3 className="card-title">Drink water, Sukanya.</h3>
      <p className="copy-muted">Because the person helping everybody regulate should not be surviving on dehydration and emotional labor.</p>
      <div className="button-row wrap-row">
        <button type="button" className="pill-button dark-pill" onClick={() => setWaterCount((value) => value + 1)}>
          I drank one 💧
        </button>
        <button type="button" className="pill-button light-pill" onClick={() => setWaterCount(0)}>
          Reset
        </button>
      </div>
      <div className="status-box">
        <p className="mini-eyebrow">today’s count</p>
        <p className="metric-number">{waterCount} glass{waterCount === 1 ? '' : 'es'}</p>
        <p className="copy-muted">{message}</p>
      </div>
    </div>
  );
}
