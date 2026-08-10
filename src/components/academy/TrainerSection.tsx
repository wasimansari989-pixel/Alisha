import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { ACADEMY_CONFIG } from '@/constants/config';
import { PersonalityIcon, ProfessionalIcon } from './icons';

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

    const drawHalftone = () => {
      const cardWidth = canvas.clientWidth || 800;
      const cardHeight = canvas.clientHeight || 450;
      canvas.width = cardWidth;
      canvas.height = cardHeight;

      // Clear main canvas
      ctx.clearRect(0, 0, cardWidth, cardHeight);
      
      // Card background is deep charcoal #0a0a0a
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      // Draw a subtle, premium abstract grid/dot pattern
      const dotSpacing = 20;
      for (let y = 10; y < cardHeight; y += dotSpacing) {
        for (let x = 10; x < cardWidth; x += dotSpacing) {
          const dx = x - cardWidth / 2;
          const dy = y - cardHeight / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt((cardWidth / 2) ** 2 + (cardHeight / 2) ** 2);
          const opacity = Math.max(0, 0.08 - (dist / maxDist) * 0.07);

          if (opacity > 0) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
          }
        }
      }
    };

    drawHalftone();

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
          {/* Halftone Canvas for Web */}
          {Platform.OS === 'web' && (
            <canvas ref={canvasRef} style={styles.webCanvas} />
          )}

          {/* Backing glows - signature Novabrew look */}
          <View style={styles.glowTopRight} />
          <View style={styles.glowBottomLeft} />

          <View style={[styles.sectionRow, isMobile && styles.sectionRowMobile]}>
            {/* Left: Avatar Showcase */}
            <View style={styles.leftCol}>
              <View style={styles.avatarBorder}>
                <View style={styles.avatarInner}>
                  <ProfessionalIcon size={72} color="#fde351" />
                </View>
              </View>
              <View style={styles.badge}>
                <PersonalityIcon size={14} color="#0a0a0a" />
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
    backgroundColor: '#ebe9e1',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  contentInner: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  trainerCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 36,
    paddingVertical: 64,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
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
    backgroundColor: 'rgba(253, 227, 81, 0.15)',
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
    backgroundColor: 'rgba(253, 227, 81, 0.06)',
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
    backgroundColor: '#0a0a0a',
  },
  avatarInner: {
    flex: 1,
    borderRadius: 80,
    backgroundColor: 'rgba(253, 227, 81, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(253, 227, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fde351',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: -20,
    zIndex: 3,
  },
  badgeText: {
    color: '#0a0a0a',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
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
    color: '#fde351',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  trainerName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  trainerRole: {
    color: '#8a8a84',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  trainerBio: {
    color: '#8a8a84',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 28,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  skillsHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
});
