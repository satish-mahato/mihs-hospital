export interface StatsApiResponse {
  d: Array<{
    __type: string;
    VAL1: number; // OPD
    VAL2: number; // New
    VAL3: number; // OLD
    VAL4: number; // BIMA
    VAL5: number; // EMERGENCY
    VAL6: number; // EMER-BIMA
    VAL7: number; // ADMIT
    VAL8: number; // ADMIT-BIMA
  }>;
}

export interface HospitalStats {
  opd: number;
  new: number;
  old: number;
  bima: number;
  emergency: number;
  emerBima: number;
  admit: number;
  admitBima: number;
  total: number;
  totalEmergency: number;
  totalAdmit: number;
  totalBima: number;
}