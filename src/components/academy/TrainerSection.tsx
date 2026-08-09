import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform, Image } from 'react-native';
import { ACADEMY_CONFIG } from '@/constants/config';
import { PersonalityIcon } from './icons';

// Import Trainer Image
const TrainerImg = require('../../Image/2.png');

export default function TrainerSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.src = TrainerImg;

    const drawHalftone = () => {
      const cardWidth = canvas.clientWidth || 800;
      const cardHeight = canvas.clientHeight || 450;
      canvas.width = cardWidth;
      canvas.height = cardHeight;

      // Crop image to cover the canvas aspect ratio (like resizeMode="cover")
      const imgRatio = img.width / img.height;
      const canvasRatio = cardWidth / cardHeight;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      if (imgRatio > canvasRatio) {
        sourceWidth = img.height * canvasRatio;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        sourceHeight = img.width / canvasRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Sample image pixels on an offscreen canvas at a fixed grid resolution (80 dots wide)
      const sampleWidth = 90;
      const sampleHeight = Math.round(sampleWidth / canvasRatio);
      
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleWidth;
      offscreen.height = sampleHeight;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sampleWidth,
        sampleHeight
      );
      
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      // Clear main canvas
      ctx.clearRect(0, 0, cardWidth, cardHeight);
      
      // Card background is deep charcoal #141416
      ctx.fillStyle = '#141416';
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      const dotSpacingX = cardWidth / sampleWidth;
      const dotSpacingY = cardHeight / sampleHeight;
      const maxRadius = Math.min(dotSpacingX, dotSpacingY) * 0.65;

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a < 50) continue;

          // Grayscale brightness (0 to 1)
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (brightness > 0.05) {
            const cx = x * dotSpacingX + dotSpacingX / 2;
            const cy = y * dotSpacingY + dotSpacingY / 2;
            const radius = brightness * maxRadius;

            // Draw white halftone dot
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            
            // Soft white dots opacity to preserve text readability
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.14})`;
            ctx.fill();
          }
        }
      }
    };

    if (img.complete) {
      drawHalftone();
    } else {
      img.onload = drawHalftone;
    }

    // Auto-redraw halftone pattern on window resize
    window.addEventListener('resize', drawHalftone);
    return () => {
      window.removeEventListener('resize', drawHalftone);
    };
  }, []);

  const expertise = [
    'Spoken English',
    'Grammar',
    'Communication',
    'Personality Development',
    'Interview Preparation',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        <View style={styles.trainerCard}>
          {/* Halftone Canvas for Web, Faded Image Fallback for Native */}
          {Platform.OS === 'web' ? (
            <canvas ref={canvasRef} style={styles.webCanvas} />
          ) : (
            <Image
              source={TrainerImg}
              style={styles.cardBgImage}
              resizeMode="cover"
            />
          )}

          {/* Backing glows - signature Novabrew look */}
          <View style={styles.glowTopRight} />
          <View style={styles.glowBottomLeft} />

          <View style={[styles.sectionRow, isMobile && styles.sectionRowMobile]}>
            {/* Left: Avatar Showcase */}
            <View style={styles.leftCol}>
              <View style={styles.avatarBorder}>
                <View style={styles.avatarInner}>
                  <Image source={TrainerImg} style={styles.avatarImg} resizeMode="cover" />
                </View>
              </View>
              <View style={styles.badge}>
                <PersonalityIcon size={14} color="#FFFFFF" />
                <Text style={styles.badgeText}>Expert Tutor</Text>
              </View>
            </View>

            {/* Right: Info */}
            <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
              <Text style={styles.sectionSubtitle}>Trainer Profile</Text>
              <Text style={styles.trainerName}>{ACADEMY_CONFIG.TRAINER_NAME}</Text>
              <Text style={styles.trainerRole}>{ACADEMY_CONFIG.TRAINER_ROLE}</Text>

              <Text style={styles.trainerBio}>
                Helping learners improve their English, communication, and confidence through practical, structured, and engaging learning methodologies.
              </Text>

              <Text style={styles.skillsHeading}>Areas of Expertise</Text>
              <View style={styles.chipsContainer}>
                {expertise.map((skill, idx) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F3E7',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  contentInner: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  trainerCard: {
    backgroundColor: '#141416',
    borderRadius: 36,
    paddingVertical: 64,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  webCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  cardBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
    zIndex: 0,
  },
  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(232, 90, 43, 0.22)',
    top: -200,
    right: -100,
    filter: 'blur(45px)' as any,
    pointerEvents: 'none',
    zIndex: 1,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(253, 198, 138, 0.1)',
    bottom: -140,
    left: '10%',
    filter: 'blur(35px)' as any,
    pointerEvents: 'none',
    zIndex: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 60,
    zIndex: 2,
  },
  sectionRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  leftCol: {
    flex: 0.9,
    alignItems: 'center',
    position: 'relative',
  },
  avatarBorder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 6,
    backgroundColor: '#141416',
  },
  avatarInner: {
    flex: 1,
    borderRadius: 80,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e85a2b',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: -20,
    zIndex: 3,
  },
  badgeText: {
    color: '#FAF9F6',
    fontSize: 12,
    fontWeight: '700',
  },
  rightCol: {
    flex: 1.1,
    alignItems: 'flex-start',
  },
  rightColMobile: {
    alignItems: 'center',
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: '#e85a2b',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  trainerName: {
    color: '#FAF9F6',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -1,
  },
  trainerRole: {
    color: '#8B847A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  trainerBio: {
    color: '#8B847A',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 28,
  },
  skillsHeading: {
    color: '#FAF9F6',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipText: {
    color: '#FAF9F6',
    fontSize: 13,
    fontWeight: '600',
  },
});
