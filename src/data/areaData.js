const areaData = [
  {
    id: 1,
    name: "Madhurawada",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Residential Hub",
    demand: "High",
    avgPrice: "₹6,000-8,000/sq.yd",
    growth: "15% annually",
    bestFor: "Family Living",
    description: "Madhurawada is one of the fastest-growing residential hubs in Vizag, known for its proximity to IT hubs, educational institutions, and excellent connectivity. The area features VMRDA-approved plots with modern amenities.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots in madhurawada",
      "plots for sale in Madhurawada",
      "VMRDA plots in Madhurawada",
      "residential plots near Madhurawada",
      "gated community plots Madhurawada"
    ]
  },
  {
    id: 2,
    name: "Kommadi",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Premium Location",
    demand: "High",
    avgPrice: "₹7,000-9,000/sq.yd",
    growth: "18% annually",
    bestFor: "Premium Investment",
    description: "Kommadi is a premium residential area with VMRDA-approved plots, offering scenic views and proximity to major landmarks. Known for its upscale developments and excellent infrastructure.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Kommadi Vizag",
      "VMRDA approved plots in Kommadi",
      "plots in kommadi",
      "residential plots near Kommadi"
    ]
  },
  {
    id: 3,
    name: "Rushikonda",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Beachfront",
    demand: "Medium",
    avgPrice: "₹8,000-12,000/sq.yd",
    growth: "20% annually",
    bestFor: "Luxury Living",
    description: "Rushikonda offers breathtaking beach views and is famous for its golden sands. The area is perfect for luxury residential plots with VMRDA approvals, attracting both investors and homebuyers.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Rushikonda",
      "residential plots near Rushikonda beach",
      "VMRDA plots Rushikonda Vizag",
      "plots in Rushikonda"
    ]
  },
  {
    id: 4,
    name: "Kapuluppada",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Gated Community",
    demand: "Medium",
    avgPrice: "₹5,000-7,000/sq.yd",
    growth: "12% annually",
    bestFor: "Secure Living",
    description: "Kapuluppada is emerging as a preferred destination for gated community plots, offering secure living with modern amenities and excellent connectivity to the city center.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Kapuluppada",
      "residential plots Kapuluppada Vizag",
      "gated community plots Kapuluppada"
    ]
  },
  {
    id: 5,
    name: "Anandapuram",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Developing Area",
    demand: "Medium",
    avgPrice: "₹4,500-6,500/sq.yd",
    growth: "10% annually",
    bestFor: "Budget Investment",
    description: "Anandapuram offers affordable VMRDA plots with great growth potential. The area is well-connected and perfect for budget-conscious investors looking for good returns.",
    image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Anandapuram Vizag",
      "VMRDA plots Anandapuram",
      "residential plots near Anandapuram"
    ]
  },
  {
    id: 6,
    name: "Bheemili",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Coastal Area",
    demand: "Medium",
    avgPrice: "₹5,500-7,500/sq.yd",
    growth: "14% annually",
    bestFor: "Retirement Homes",
    description: "Bheemili is a serene coastal town with beautiful beaches and a relaxed lifestyle. Ideal for retirement homes and vacation properties with VMRDA-approved plots.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Bheemili Vizag",
      "residential plots near Bheemili beach",
      "VMRDA plots in Bheemili"
    ]
  },
  {
    id: 7,
    name: "Tagarapuvalasa",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Industrial Corridor",
    demand: "Low",
    avgPrice: "₹3,500-5,000/sq.yd",
    growth: "8% annually",
    bestFor: "Industrial Investment",
    description: "Located in the industrial corridor, Tagarapuvalasa offers affordable plots with potential for industrial and residential development, attracting both investors and businesses.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Tagarapuvalasa",
      "residential plots Tagarapuvalasa Vizag",
      "gated community plots Tagarapuvalasa"
    ]
  },
  {
    id: 8,
    name: "Bhogapuram",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Airport Corridor",
    demand: "Very High",
    avgPrice: "₹6,500-10,000/sq.yd",
    growth: "25% annually",
    bestFor: "High ROI Investment",
    description: "Bhogapuram is the hottest investment destination due to the upcoming international airport. VMRDA-approved plots here promise exceptional returns with strategic location advantages.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale near Bhogapuram Airport",
      "residential plots near Bhogapuram",
      "VMRDA approved plots Bhogapuram",
      "airport corridor plots Vizag"
    ]
  },
  {
    id: 9,
    name: "Boyapalem",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Suburban Area",
    demand: "Low",
    avgPrice: "₹3,000-4,500/sq.yd",
    growth: "7% annually",
    bestFor: "Affordable Housing",
    description: "Boyapalem offers the most affordable plots in Vizag, perfect for first-time home buyers and those looking for budget-friendly residential options.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Boyapalem",
      "residential plots Boyapalem Vizag"
    ]
  },
  {
    id: 10,
    name: "Polipalli",
    location: "Visakhapatnam, Andhra Pradesh",
    areaType: "Developing Suburb",
    demand: "Medium",
    avgPrice: "₹4,000-6,000/sq.yd",
    growth: "11% annually",
    bestFor: "Long-term Investment",
    description: "Polipalli is an emerging suburb with good growth potential. The area offers VMRDA-approved plots at reasonable prices, suitable for long-term investment strategies.",
    image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    keywords: [
      "plots for sale in Polipalli Vizag",
      "residential plots near Polipalli"
    ]
  }
];

export default areaData;