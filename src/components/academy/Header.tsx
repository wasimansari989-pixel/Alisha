import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { MenuIcon, CloseIcon } from './icons';

interface HeaderProps {
  onScrollTo: (section: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const navItems = [
    { label: 'Courses', target: 'courses' },
    { label: 'Why Us', target: 'why-us' },
    { label: 'Trainer', target: 'trainer' },
  ];

  const handleNavPress = (target: string) => {
    setMobileMenuOpen(false);
    onScrollTo(target);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.navPill}>
        {/* Logo */}
        <Pressable onPress={() => handleNavPress('home')} style={styles.logoContainer}>
          <Text style={styles.logoTitle}>learnenglish</Text>
        </Pressable>

        {/* Desktop Links */}
        {!isMobile && (
          <View style={styles.headerNav}>
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <TouchableOpacity
                  key={item.target}
                  onPress={() => handleNavPress(item.target)}
                  style={[styles.navLink, isActive && styles.navLinkActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.navText, isActive && styles.navTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Action Button & Menu */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={() => handleNavPress('contact')}
            style={styles.bookCta}
            activeOpacity={0.8}
          >
            <Text style={styles.bookCtaText}>Book a call</Text>
          </TouchableOpacity>

          {isMobile && (
            <TouchableOpacity
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.menuButton}
              activeOpacity={0.7}
            >
              {mobileMenuOpen ? (
                <CloseIcon size={18} color="#FFFFFF" />
              ) : (
                <MenuIcon size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mobile Drawer Menu */}
      {isMobile && mobileMenuOpen && (
        <View style={styles.mobileNavContainer}>
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <TouchableOpacity
                key={item.target}
                onPress={() => handleNavPress(item.target)}
                style={styles.mobileNavLink}
                activeOpacity={0.7}
              >
                <Text style={[styles.mobileNavText, isActive && styles.mobileNavTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...Platform.select({
      web: {
        position: 'fixed' as any,
      },
    }),
  },
  navPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 100,
    padding: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          inset 0 -1px 2px rgba(0, 0, 0, 0.5),
          0 2px 0 #000,
          0 6px 14px -2px rgba(0, 0, 0, 0.25),
          0 16px 30px -10px rgba(0, 0, 0, 0.2)
        `,
      } as any,
    }),
  },
  logoContainer: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  logoTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.5,
    textTransform: 'lowercase',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navLink: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
  },
  navLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  navText: {
    color: '#cccccc',
    fontSize: 14.5,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  navTextActive: {
    color: '#ffffff',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookCta: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fde351',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d8b020',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffe760 0%, #fde351 55%, #f7d130 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 -1px 2px rgba(180, 140, 30, 0.3) inset',
        cursor: 'pointer',
      } as any,
    }),
  },
  bookCtaText: {
    color: '#0a0a0a',
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  menuButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileNavContainer: {
    position: 'absolute',
    top: 64,
    left: 24,
    right: 24,
    backgroundColor: '#0a0a0a',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      web: {
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  mobileNavLink: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  mobileNavText: {
    color: '#cccccc',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  mobileNavTextActive: {
    color: '#ffffff',
  },
});
