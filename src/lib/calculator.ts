export interface CalculationParams {
  width: number; // in cm
  height: number; // in cm
  profileType: string;
  profileColor: string;
  sections: number;
  glassType: string;
}

export interface CalculationResult {
  totalPrice: number;
  breakdown: {
    profileCost: number;
    internalProfileCost: number;
    glassCost: number;
  };
}

export const PROFILE_TYPES = [
  'Profil Standard',
  'Profil Premium',
  'Profil Deluxe',
  'Profil Economic',
  'Profil Luxury'
];

export const PROFILE_COLORS = [
  'Alb',
  'Maro',
  'Negru',
  'Custom'
];

export const GLASS_TYPES = [
  'Transparentă',
  'Mată',
  'Neagră',
  'Maro',
  'Custom'
];

export const calculatePrice = (params: CalculationParams): CalculationResult => {
  const { width, height, sections } = params;
  
  // Constants for calculation
  const PROFILE_CONSTANT = 70; // for profil mare
  const INTERNAL_PROFILE_CONSTANT = 50; // for inbetween profile
  const GLASS_CONSTANT = 100; // for sticla
  
  // Calculate perimeter of the big rectangle (in meters)
  const bigRectanglePerimeter = ((width + height) * 2) / 100; // convert cm to m
  
  // Calculate perimeter of each glass section
  const sectionWidth = width / sections;
  const glassPerimeter = ((sectionWidth + height) * 2) / 100; // convert cm to m
  
  // Calculate costs
  const profileCost = bigRectanglePerimeter * PROFILE_CONSTANT;
  const internalProfileCost = glassPerimeter * sections * INTERNAL_PROFILE_CONSTANT;
  const glassCost = bigRectanglePerimeter * GLASS_CONSTANT;
  
  const totalPrice = profileCost + internalProfileCost + glassCost;
  
  return {
    totalPrice: Math.round(totalPrice * 100) / 100, // round to 2 decimal places
    breakdown: {
      profileCost: Math.round(profileCost * 100) / 100,
      internalProfileCost: Math.round(internalProfileCost * 100) / 100,
      glassCost: Math.round(glassCost * 100) / 100
    }
  };
};