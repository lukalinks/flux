// Farcaster service for phone number resolution
export interface FarcasterProfile {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  verifiedAddresses: string[];
  phoneNumber?: string;
}

export interface PhoneResolutionResult {
  success: boolean;
  address?: string;
  profile?: FarcasterProfile;
  error?: string;
}

class FarcasterService {
  private apiUrl = 'https://api.farcaster.xyz/v2';
  private apiKey = process.env.NEXT_PUBLIC_FARCASTER_API_KEY;

  // Search for profiles by phone number
  async searchByPhoneNumber(phoneNumber: string): Promise<PhoneResolutionResult> {
    try {
      // Farcaster doesn't directly support phone number search
      // We'll implement a workaround using verified addresses
      // For demo purposes, we'll return a mock profile
      // In production, you'd implement proper phone number resolution
      const mockProfile: FarcasterProfile = {
        fid: 12345,
        username: 'demo_user',
        displayName: 'Demo User',
        pfp: 'https://placehold.co/400x400',
        verifiedAddresses: ['0x' + '1'.repeat(40)],
        phoneNumber: phoneNumber
      };

      return {
        success: true,
        address: mockProfile.verifiedAddresses[0],
        profile: mockProfile
      };

    } catch (error) {
      console.error('Error searching Farcaster profiles:', error);
      return {
        success: false,
        error: 'Failed to search profiles'
      };
    }
  }

  // Get profile by FID
  async getProfileByFid(fid: number): Promise<PhoneResolutionResult> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${fid}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Profile not found');
      }

      const data = await response.json();
      const profile = data.user as FarcasterProfile;

      if (profile && profile.verifiedAddresses.length > 0) {
        return {
          success: true,
          address: profile.verifiedAddresses[0],
          profile
        };
      }

      return {
        success: false,
        error: 'Profile not found'
      };

    } catch (error) {
      console.error('Error getting Farcaster profile:', error);
      return {
        success: false,
        error: 'Failed to get profile'
      };
    }
  }

  // Validate phone number format
  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  }

  // Format phone number for display
  formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    if (cleaned.startsWith('+1') && cleaned.length === 12) {
      return `+1 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    
    return cleaned;
  }
}

export const farcasterService = new FarcasterService();