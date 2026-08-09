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
import { MenuIcon, CloseIcon, ArrowRightIcon } from './icons';

interface HeaderProps {
  onScrollTo: (section: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 992;

  const navItems = [
    { label: 'Courses', target: 'courses' },
    { label: 'Why Us', target: 'why-us' },
    { label: 'Trainer', target: 'trainer' },
    { label: 'Get in touch', target: 'contact' },
  ];

  const handleNavPress = (target: string) => {
    setMobileMenuOpen(false);
    onScrollTo(target);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInner}>
        {/* Spherical Logo Dot */}
        <Pressable onPress={() => handleNavPress('home')} style={styles.logoContainer}>
          <View style={styles.logoDotContainer}>
            <View style={styles.logoDotInner} />
            <View style={styles.logoDotGlow} />
          </View>
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
                  style={styles.navLink}
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
          {!isMobile && (
            <TouchableOpacity
              onPress={() => handleNavPress('contact')}
              style={styles.headerBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.headerBtnText}>Start a project</Text>
              <View style={styles.arrowCircle}>
                <ArrowRightIcon size={10} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          )}

          {isMobile && (
            <TouchableOpacity
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.menuButton}
              activeOpacity={0.7}
            >
              {mobileMenuOpen ? (
                <CloseIcon size={24} color="#141416" />
              ) : (
                <MenuIcon size={24} color="#141416" />
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(248, 243, 231, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: '#dad2bf',
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        backdropFilter: 'blur(20px)',
      },
    }),
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 88,
    paddingHorizontal: 24,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
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
  logoTitle: {
    color: '#141416',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    textTransform: 'lowercase',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },
  navLink: {
    paddingVertical: 12,
  },
  navText: {
    color: '#8B847A',
    fontSize: 14,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#141416',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingLeft: 22,
    paddingRight: 10,
    backgroundColor: '#141416',
    borderRadius: 999,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  headerBtnText: {
    color: '#FAF9F6',
    fontSize: 13,
    fontWeight: '700',
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e85a2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileNavContainer: {
    backgroundColor: '#F8F3E7',
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#dad2bf',
  },
  mobileNavLink: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(20, 20, 22, 0.05)',
  },
  mobileNavText: {
    color: '#8B847A',
    fontSize: 15,
    fontWeight: '600',
  },
  mobileNavTextActive: {
    color: '#141416',
    fontWeight: '700',
  },
});
