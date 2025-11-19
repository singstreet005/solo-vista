export interface LinkItem {
  id: string;
  title: string;
  url: string; // The final destination (Payment Link or External Site)
  isActive: boolean;
  type: 'direct' | 'service';
  description?: string;
  buttonText?: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  backgroundImageUrl: string;
  backgroundAudioUrl: string | null;
  overlayOpacity: number; // 0 to 100
  fontFamily: string;
  fontSize: 'sm' | 'md' | 'lg'; // Global/Bio font size
  linkFontSize: 'sm' | 'md' | 'lg'; // Specific link button text size
}

export interface AppState {
  profile: UserProfile;
  links: LinkItem[];
}