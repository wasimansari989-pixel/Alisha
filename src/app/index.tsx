import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, lazy } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

// Static Imports (visible immediately above-the-fold)
import Header from '@/components/academy/Header';
import HeroSection from '@/components/academy/HeroSection';
import { ArrowRightIcon } from '@/components/academy/icons';
import type { ContactFormRef } from '@/components/academy/ContactForm';

// Lazy-Loaded Imports (off-screen sections loaded progressively)
const AudienceSection = lazy(() => import('@/components/academy/AudienceSection'));
const CTASection = lazy(() => import('@/components/academy/CTASection'));
const ClassModeSection = lazy(() => import('@/components/academy/ClassModeSection'));
const ContactForm = lazy(() => import('@/components/academy/ContactForm'));
const CoursesSection = lazy(() => import('@/components/academy/CoursesSection'));
const FAQSection = lazy(() => import('@/components/academy/FAQSection'));
const Footer = lazy(() => import('@/components/academy/Footer'));
const LearningJourney = lazy(() => import('@/components/academy/LearningJourney'));
const StatsSection = lazy(() => import('@/components/academy/StatsSection'));
const TrainerSection = lazy(() => import('@/components/academy/TrainerSection'));
const WhyUsSection = lazy(() => import('@/components/academy/WhyUsSection'));

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Refs for ScrollView and Contact Form
  const scrollViewRef = useRef<ScrollView>(null);
  const contactFormRef = useRef<ContactFormRef>(null);

  // Layout states to map sections dynamically
  const [layouts, setLayouts] = useState<{ [key: string]: number }>({});
  const [activeSection, setActiveSection] = useState('home');

  // Callback to store Y coordinate of section layout
  const handleSectionLayout = (section: string, y: number) => {
    setLayouts((prev) => ({ ...prev, [section]: y }));
  };

  // Scroll to section action
  const scrollToSection = (target: string) => {
    const yOffset = layouts[target];
    if (yOffset !== undefined && scrollViewRef.current) {
      // Adjust offset slightly to account for the sticky header (height 72)
      scrollViewRef.current.scrollTo({
        y: Math.max(0, yOffset - 70),
        animated: true,
      });
    }
  };

  // Select online/offline class and scroll to contact form
  const handleSelectClassMode = (mode: 'Online' | 'Offline' | 'Not Sure') => {
    if (contactFormRef.current) {
      contactFormRef.current.setSelectedMode(mode);
    }
    scrollToSection('contact');
  };

  // Scroll handler to track active navigation section
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    let currentSection = 'home';

    // Sort layouts entries by their y values
    const sortedSections = Object.entries(layouts).sort((a, b) => a[1] - b[1]);

    for (const [section, y] of sortedSections) {
      // Shift threshold to make section active before reaching it exactly
      if (scrollY >= y - 120) {
        currentSection = section;
      }
    }
    setActiveSection(currentSection);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar style="light" />

      {/* Sticky Top Header */}
      <Header onScrollTo={scrollToSection} activeSection={activeSection} />

      {/* Main Page ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Hero Section */}
        <View
          onLayout={(e) => handleSectionLayout('home', e.nativeEvent.layout.y)}
        >
          <HeroSection onScrollTo={scrollToSection} />
        </View>

        <Suspense fallback={<View style={{ height: 200, backgroundColor: '#ebe9e1' }} />}>
          {/* 2. Trust Stats Section */}
          <StatsSection />

          {/* 3. Why Us Section */}
          <View
            onLayout={(e) => handleSectionLayout('why-us', e.nativeEvent.layout.y)}
          >
            <WhyUsSection />
          </View>

          {/* 4. Courses Grid Section */}
          <View
            onLayout={(e) => handleSectionLayout('courses', e.nativeEvent.layout.y)}
          >
            <CoursesSection onEnrollPress={() => scrollToSection('contact')} />
          </View>

          {/* 5. Learning Journey Timeline */}
          <LearningJourney />

          {/* 6. Class Mode Selection (Online vs Offline) */}
          <ClassModeSection onSelectMode={handleSelectClassMode} />

          {/* 7. Trainer Profile Section */}
          <View
            onLayout={(e) => handleSectionLayout('trainer', e.nativeEvent.layout.y)}
          >
            <TrainerSection />
          </View>

          {/* 8. Target Audience Section */}
          <AudienceSection />

          {/* 9. FAQs Accordion Section */}
          <FAQSection />

          {/* 10. Testimonial CTA Banner */}
          <CTASection onJoinPress={() => scrollToSection('contact')} />

          {/* 11. Contact Form Section */}
          <View
            onLayout={(e) => handleSectionLayout('contact', e.nativeEvent.layout.y)}
          >
            <ContactForm ref={contactFormRef} />
          </View>

          {/* 12. Footer */}
          <Footer onScrollTo={scrollToSection} />
        </Suspense>
      </ScrollView>

      {/* Mobile Sticky bottom CTA button */}
      {isMobile && activeSection !== 'contact' && (
        <View style={styles.mobileStickyCta}>
          <TouchableOpacity
            style={styles.stickyButton}
            onPress={() => scrollToSection('contact')}
            activeOpacity={0.9}
          >
            <Text style={styles.stickyButtonText}>Start Learning</Text>
            <ArrowRightIcon size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8F3E7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 0 : 40,
  },
  mobileStickyCta: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: '#141416',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        position: 'fixed' as any,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      },
    }),
  },
  stickyButton: {
    backgroundColor: '#141416',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#141416',
  },
  stickyButtonText: {
    color: '#FAF9F6',
    fontSize: 16,
    fontWeight: '800',
  },
});
