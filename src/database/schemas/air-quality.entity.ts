import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('air_quality')
export class AirQuality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ type: 'float', name: 'co_gt' })
  coGt: number;

  @Column({ type: 'int', name: 'pt08_s1_co' })
  pt08S1Co: number;

  @Column({ type: 'int', name: 'nmhc_gt' })
  nmhcGt: number;

  @Column({ type: 'float', name: 'c6h6_gt' })
  c6h6Gt: number;

  @Column({ type: 'int', name: 'pt08_s2_nmhc' })
  pt08S2Nmhc: number;

  @Column({ type: 'int', name: 'nox_gt' })
  noxGt: number;

  @Column({ type: 'int', name: 'pt08_s3_nox' })
  pt08S3Nox: number;

  @Column({ type: 'int', name: 'no2_gt' })
  no2Gt: number;

  @Column({ type: 'int', name: 'pt08_s4_no2' })
  pt08S4No2: number;

  @Column({ type: 'int', name: 'pt08_s5_o3' })
  pt08S5O3: number;

  @Column({ type: 'float', name: 't' })
  t: number;

  @Column({ type: 'float', name: 'rh' })
  rh: number;

  @Column({ type: 'float', name: 'ah' })
  ah: number;
}
