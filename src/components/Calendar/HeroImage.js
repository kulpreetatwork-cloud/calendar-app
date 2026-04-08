import Image from 'next/image';
import styles from './HeroImage.module.css';

/**
 * Hero image component for the calendar.
 * Displays a full-width image with a diagonal wave overlay and month/year text.
 */
export default function HeroImage({ imageUrl, monthName, year, accentColor }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.hero}>
      {/* Hero photograph using Next.js Image for optimization */}
      <Image
        src={imageUrl}
        alt={`${monthName} landscape`}
        className={styles.heroImage}
        fill
        priority={true}
        onLoad={() => setImageLoaded(true)}
        style={{ 
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />

      {/* Diagonal wave overlay (matches reference design) */}
      <div className={styles.waveOverlay}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Semi-transparent wave layer */}
          <path
            d="M0,140 L0,80 Q300,20 600,60 Q900,100 1200,40 L1200,140 Z"
            fill={accentColor}
            fillOpacity="0.4"
          />
          {/* Solid accent wave layer */}
          <path
            d="M0,140 L0,100 Q300,50 600,80 Q900,110 1200,60 L1200,140 Z"
            fill={accentColor}
            fillOpacity="0.7"
          />
          {/* White bottom strip for seamless merge with calendar body */}
          <path
            d="M0,140 L0,120 Q300,90 600,110 Q900,130 1200,95 L1200,140 Z"
            fill="var(--bg-card)"
          />
        </svg>
      </div>

      {/* Month and year overlay text */}
      <div className={styles.monthOverlay}>
        <div className={styles.yearText}>{year}</div>
        <div className={styles.monthText}>{monthName}</div>
      </div>
    </div>
  );
}
