import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Linking } from 'react-native';
import { ACADEMY_CONFIG } from '@/constants/config';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './icons';

interface FooterProps {
  onScrollTo: (section: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const currentYear = new Date().getFullYear();

  const handleLinkPress = (target: string) => {
    onScrollTo(target);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        <View style={[styles.mainRow, isMobile && styles.mainRowMobile]}>
          {/* Brand Col */}
          <View style={[styles.brandCol, isMobile && styles.alignCenter]}>
            <View style={styles.logoRow}>
              {/* Spherical Logo Dot */}
              <View style={styles.logoDotContainer}>
                <View style={styles.logoDotInner} />
                <View style={styles.logoDotGlow} />
              </View>
              <Text style={styles.brandTitle}>learnenglish</Text>
            </View>
            <Text style={styles.brandTagline}>
              Better English • Better Communication • Better Future
            </Text>
          </View>

          {/* Links Col */}
          <View style={[styles.linksCol, isMobile && styles.linksColMobile]}>
            <Text style={styles.sectionHeader}>Quick Links</Text>
            <View style={[styles.linksList, isMobile && styles.alignCenter]}>
              <TouchableOpacity onPress={() => handleLinkPress('home')} activeOpacity={0.7}>
                <Text style={styles.linkText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLinkPress('courses')} activeOpacity={0.7}>
                <Text style={styles.linkText}>Courses</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLinkPress('why-us')} activeOpacity={0.7}>
                <Text style={styles.linkText}>Why Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLinkPress('trainer')} activeOpacity={0.7}>
                <Text style={styles.linkText}>About Trainer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLinkPress('contact')} activeOpacity={0.7}>
                <Text style={styles.linkText}>Contact & Enroll</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Socials Col */}
          <View style={[styles.socialsCol, isMobile && styles.alignCenter]}>
            <Text style={styles.sectionHeader}>Connect With Us</Text>
            <Text style={styles.connectText}>Follow our social pages to get daily vocabulary and grammar tips.</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialIcon}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(ACADEMY_CONFIG.INSTAGRAM_URL)}
              >
                <InstagramIcon size={20} color="#E1306C" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIcon}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(ACADEMY_CONFIG.FACEBOOK_URL)}
              >
                <FacebookIcon size={20} color="#1877F2" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIcon}
                activeOpacity={0.7}
                onPress={() => {
                  const cleanedNum = ACADEMY_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '');
                  if (cleanedNum) {
                    Linking.openURL('https://wa.me/' + cleanedNum);
                  }
                }}
              >
                <WhatsAppIcon size={20} color="#25D366" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Bottom Bar */}
        <View style={[styles.bottomBar, isMobile && styles.bottomBarMobile]}>
          <Text style={styles.copyText}>
            © {currentYear} {ACADEMY_CONFIG.ACADEMY_NAME}. All Rights Reserved.
          </Text>
          <View style={styles.bottomLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.copyText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.bulletSeparator}>•</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.copyText}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141416',
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentInner: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 48,
    marginBottom: 48,
  },
  mainRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  brandCol: {
    flex: 1.2,
    gap: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoDotContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e85a2b',
    position: 'relative',
    overflow: 'hidden',
  },
  logoDotInner: {
    position: 'absolute',
    inset: 0,
    borderRadius: 8,
    backgroundColor: '#d9351f',
  },
  logoDotGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#fdc68a',
    opacity: 0.6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    textTransform: 'lowercase',
  },
  brandTagline: {
    color: '#8B847A',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 320,
  },
  linksCol: {
    flex: 0.8,
    gap: 16,
  },
  linksColMobile: {
    alignItems: 'center',
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  linksList: {
    gap: 12,
  },
  alignCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },
  linkText: {
    color: '#8B847A',
    fontSize: 14,
    fontWeight: '600',
  },
  socialsCol: {
    flex: 1,
    gap: 16,
  },
  connectText: {
    color: '#8B847A',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 280,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 14,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#232326',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  bottomBarMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletSeparator: {
    color: 'rgba(255, 255, 255, 0.1)',
    fontSize: 10,
  },
  copyText: {
    color: 'rgba(139, 132, 122, 0.5)',
    fontSize: 12,
  },
});
