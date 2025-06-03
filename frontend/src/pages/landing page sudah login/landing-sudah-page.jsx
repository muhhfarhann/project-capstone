import { useEffect, useState } from 'react';
import LandingSudahView from './landing-sudah-view';
import LandingSudahPresenter from './landing-sudah-presenter';

export default function LandingSudahPage() {
  const [content, setContent] = useState({ user: null, moodData: [] });

  useEffect(() => {
    const presenter = new LandingSudahPresenter({
      renderContent: (data) => {
        setContent(data);
      },
    });

    presenter.loadContent();
  }, []);

  return <LandingSudahView {...content} />;
}
