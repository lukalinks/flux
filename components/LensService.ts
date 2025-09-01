// Lens Protocol service for phone number resolution
export interface LensProfile {
  id: string;
  handle: string;
  ownedBy: string;
  metadata?: {
    phoneNumber?: string;
    displayName?: string;
    bio?: string;
  };
}

export interface PhoneResolutionResult {
  success: boolean;
  address?: string;
  profile?: LensProfile;
  error?: string;
}

class LensService {
  private apiUrl = 'https://api.lens.dev';
  private apiKey = process.env.NEXT_PUBLIC_LENS_API_KEY;

  // Search for profiles by phone number
  async searchByPhoneNumber(phoneNumber: string): Promise<PhoneResolutionResult> {
    try {
      const response = await fetch(`${this.apiUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          query: `
            query SearchProfiles($query: String!) {
              search(request: {
                query: $query,
                type: PROFILE,
                limit: 10
              }) {
                items {
                  ... on Profile {
                    id
                    handle
                    ownedBy
                    metadata {
                      phoneNumber
                      displayName
                      bio
                    }
                  }
                }
              }
            }
          `,
          variables: {
            query: phoneNumber
          }
        })
      });

      const data = await response.json();

      if (data.errors) {
        return {
          success: false,
          error: data.errors[0].message
        };
      }

      const profiles = data.data.search.items as LensProfile[];
      
      // Find profile with matching phone number
      const matchingProfile = profiles.find(profile => 
        profile.metadata?.phoneNumber === phoneNumber
      );

      if (matchingProfile) {
        return {
          success: true,
          address: matchingProfile.ownedBy,
          profile: matchingProfile
        };
      }

      return {
        success: false,
        error: 'No profile found with this phone number'
      };

    } catch (error) {
      console.error('Error searching Lens profiles:', error);
      return {
        success: false,
        error: 'Failed to search profiles'
      };
    }
  }

  // Get profile by handle
  async getProfileByHandle(handle: string): Promise<PhoneResolutionResult> {
    try {
      const response = await fetch(`${this.apiUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          query: `
            query GetProfile($handle: Handle!) {
              profile(request: { handle: $handle }) {
                id
                handle
                ownedBy
                metadata {
                  phoneNumber
                  displayName
                  bio
                }
              }
            }
          `,
          variables: {
            handle
          }
        })
      });

      const data = await response.json();

      if (data.errors) {
        return {
          success: false,
          error: data.errors[0].message
        };
      }

      const profile = data.data.profile as LensProfile;

      if (profile) {
        return {
          success: true,
          address: profile.ownedBy,
          profile
        };
      }

      return {
        success: false,
        error: 'Profile not found'
      };

    } catch (error) {
      console.error('Error getting Lens profile:', error);
      return {
        success: false,
        error: 'Failed to get profile'
      };
    }
  }

  // Create or update phone number association
  async updatePhoneNumber(handle: string, phoneNumber: string): Promise<boolean> {
    try {
      // This would require authentication and proper mutation
      // For now, we'll return a mock success
      console.log(`Would update phone number for ${handle}: ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('Error updating phone number:', error);
      return false;
    }
  }

  // Validate phone number format
  validatePhoneNumber(phoneNumber: string): boolean {
    // Basic phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  }

  // Format phone number for display
  formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Basic formatting for US numbers
    if (cleaned.startsWith('+1') && cleaned.length === 12) {
      return `+1 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    
    return cleaned;
  }
}

export const lensService = new LensService();