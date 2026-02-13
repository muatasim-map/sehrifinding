
import { RawSehriSpot } from "../types";

export const HYDERABAD_DATA: RawSehriSpot[] = [
  // Old City / Charminar Area
  { 
    "location_id": 5001, 
    "city": "Hyderabad", 
    "venue_name": "Makkah Masjid", 
    "primary_area": "Charminar", 
    "venue_type": "Masjid", 
    "food_type": "Free", 
    "timing": { "start": "03:00", "end": "04:20" },
    "landmark": "Near Charminar",
    "features": ["Free", "DineIn", "LargeCapacity"],
    "zone": "South" 
  },
  { 
    "location_id": 5002, 
    "city": "Hyderabad", 
    "venue_name": "Hotel Shadab", 
    "primary_area": "Charminar", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "02:00", "end": "04:30" },
    "landmark": "High Court Road, Ghansi Bazaar",
    "phones": ["040-24565949"],
    "features": ["Paid", "DineIn", "AC"],
    "notes": "Famous for Sehri Nihari and Paya",
    "zone": "South" 
  },
  { 
    "location_id": 5003, 
    "city": "Hyderabad", 
    "venue_name": "Shah Ghouse Hotel & Restaurant", 
    "primary_area": "Charminar", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "02:00", "end": "04:30" },
    "landmark": "Shah Ali Banda",
    "features": ["Paid", "DineIn", "FamilySection"],
    "zone": "South" 
  },
  
  // Tolichowki & Mehdipatnam
  { 
    "location_id": 5004, 
    "city": "Hyderabad", 
    "venue_name": "Masjid-e-Quba", 
    "primary_area": "Mehdipatnam", 
    "venue_type": "Masjid", 
    "food_type": "Free", 
    "timing": { "start": "03:15", "end": "04:15" },
    "features": ["Free", "DineIn"],
    "zone": "West" 
  },
  { 
    "location_id": 5005, 
    "city": "Hyderabad", 
    "venue_name": "Pista House", 
    "primary_area": "Tolichowki", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "02:00", "end": "04:30" },
    "landmark": "Opposite Shaikpet Nala",
    "features": ["Paid", "Takeaway", "Delivery"],
    "notes": "Haleem available occasionally for Sehri",
    "zone": "West" 
  },
  { 
    "location_id": 5006, 
    "city": "Hyderabad", 
    "venue_name": "Masjid-e-Noor", 
    "primary_area": "Tolichowki", 
    "venue_type": "Masjid", 
    "food_type": "Free", 
    "timing": { "start": "03:00", "end": "04:15" },
    "landmark": "Paramount Colony",
    "features": ["Free", "DineIn", "CommunityFunded"],
    "zone": "West" 
  },
  { 
    "location_id": 5007, 
    "city": "Hyderabad", 
    "venue_name": "4 Seasons Restaurant", 
    "primary_area": "Tolichowki", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "02:30", "end": "04:30" },
    "features": ["Paid", "DineIn", "MiddleEasternCuisine"],
    "zone": "West" 
  },

  // Central & Other Areas
  { 
    "location_id": 5008, 
    "city": "Hyderabad", 
    "venue_name": "Masjid-e-Bilal", 
    "primary_area": "AC Guards", 
    "venue_type": "Masjid", 
    "food_type": "Free", 
    "zone": "Central" 
  },
  { 
    "location_id": 5009, 
    "city": "Hyderabad", 
    "venue_name": "Sohail Hotel", 
    "primary_area": "Malakpet", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "02:00", "end": "04:30" },
    "landmark": "Nalgonda X Roads",
    "features": ["Paid", "DineIn"],
    "notes": "Budget friendly sehri options",
    "zone": "East" 
  },
  { 
    "location_id": 5010, 
    "city": "Hyderabad", 
    "venue_name": "Masjid-e-Azizia", 
    "primary_area": "Humayun Nagar", 
    "venue_type": "Masjid", 
    "food_type": "Free", 
    "timing": { "start": "03:00", "end": "04:15" },
    "landmark": "Mehdipatnam Road",
    "features": ["Free", "DineIn", "TravelerSupport"],
    "zone": "West" 
  },
  { 
    "location_id": 5011, 
    "city": "Hyderabad", 
    "venue_name": "Grand Hotel", 
    "primary_area": "Abids", 
    "venue_type": "Restaurant", 
    "food_type": "Paid", 
    "timing": { "start": "01:30", "end": "04:30" },
    "landmark": "Abids Circle",
    "features": ["Paid", "DineIn", "Historic"],
    "notes": "Open all night",
    "zone": "Central" 
  },
  { 
    "location_id": 5012, 
    "city": "Hyderabad", 
    "venue_name": "Paramount Colony Gate 1 Distribution", 
    "primary_area": "Tolichowki", 
    "venue_type": "Foundation", 
    "food_type": "Free", 
    "notes": "Free Sehri food is often distributed here for those in need.", 
    "features": ["Free", "Takeaway"],
    "zone": "West" 
  },
  {
    "location_id": 5013,
    "city": "Hyderabad", 
    "venue_name": "Nayab Hotel",
    "primary_area": "Charminar",
    "venue_type": "Restaurant",
    "food_type": "Paid",
    "timing": { "start": "03:00", "end": "04:30" },
    "landmark": "Nayapul Road",
    "features": ["Paid", "DineIn", "BhejaFrySpecial"],
    "zone": "South"
  }
];
