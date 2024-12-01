import { AirQuality } from '../database/schemas/air-quality.entity';

interface CsvRow {
  Date: string;
  Time: string;
  'CO(GT)': string;
  'PT08.S1(CO)': string;
  'NMHC(GT)': string;
  'C6H6(GT)': string;
  'PT08.S2(NMHC)': string;
  'NOx(GT)': string;
  'PT08.S3(NOx)': string;
  'NO2(GT)': string;
  'PT08.S4(NO2)': string;
  'PT08.S5(O3)': string;
  T: string;
  RH: string;
  AH: string;
}

export const mapCsvRowToEntity = (csvRow: CsvRow): Omit<AirQuality, 'id'> => {
  const normalizedKeysRow = Object.fromEntries(
    Object.entries(csvRow).map(([key, value]) => [key.trim(), value]),
  );
  const [date, month, year] = normalizedKeysRow.Date.split('/');
  return {
    date: `20${year}-${month}-${date}`,
    time:
      (normalizedKeysRow.Time.length === 7 ? '0' : '') + normalizedKeysRow.Time,
    coGt: parseFloat(normalizedKeysRow['CO(GT)']) ?? null,
    pt08S1Co: parseInt(normalizedKeysRow['PT08.S1(CO)']) ?? null,
    nmhcGt: parseInt(normalizedKeysRow['NMHC(GT)']) ?? null,
    c6h6Gt: parseFloat(normalizedKeysRow['C6H6(GT)']) ?? null,
    pt08S2Nmhc: parseInt(normalizedKeysRow['PT08.S2(NMHC)']) ?? null,
    noxGt: parseInt(normalizedKeysRow['NOx(GT)']) ?? null,
    pt08S3Nox: parseInt(normalizedKeysRow['PT08.S3(NOx)']) ?? null,
    no2Gt: parseInt(normalizedKeysRow['NO2(GT)']) ?? null,
    pt08S4No2: parseInt(normalizedKeysRow['PT08.S4(NO2)']) ?? null,
    pt08S5O3: parseInt(normalizedKeysRow['PT08.S5(O3)']) ?? null,
    t: parseFloat(normalizedKeysRow.T) ?? null,
    rh: parseFloat(normalizedKeysRow.RH) ?? null,
    ah: parseFloat(normalizedKeysRow.AH) ?? null,
  };
};
