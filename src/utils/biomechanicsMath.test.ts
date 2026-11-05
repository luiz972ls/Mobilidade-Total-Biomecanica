import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAutoregulatedPrescription,
  calculateAuditKPIs,
  generateMonthlyAuditPrompt,
  DailyAuditLog
} from './biomechanicsMath';

const sampleLogs: DailyAuditLog[] = [
  {
    id: 'log-1',
    date: '2026-10-05',
    shift: 'AMBOS',
    adherencePct: 85,
    morningStiffness: 7,
    sleepQuality: 6,
    regionalPain: {
      craniofacialAtm: 5,
      cervicalSuboccipital: 6,
      thoracicScapular: 5,
      upperLimbsWrists: 3,
      lumbarPelvicSij: 6,
      hipKneeAnklePlantar: 4
    },
    romTests: {
      ankleDorsiflexionLeftCm: 8.5,
      ankleDorsiflexionRightCm: 10.5,
      hipInternalRotationLeftDeg: 28,
      hipInternalRotationRightDeg: 35,
      thoracicRotationLeftDeg: 42,
      thoracicRotationRightDeg: 48,
      cervicalLateralFlexionLeftDeg: 36,
      cervicalLateralFlexionRightDeg: 40,
      tmjOpeningMm: 36,
      lumbarSchoberCm: 4.1
    },
    notes: 'Início do protocolo.'
  },
  {
    id: 'log-2',
    date: '2026-11-04',
    shift: 'AMBOS',
    adherencePct: 95,
    morningStiffness: 3,
    sleepQuality: 8,
    regionalPain: {
      craniofacialAtm: 2,
      cervicalSuboccipital: 2,
      thoracicScapular: 2,
      upperLimbsWrists: 1,
      lumbarPelvicSij: 4,
      hipKneeAnklePlantar: 2
    },
    romTests: {
      ankleDorsiflexionLeftCm: 10.0,
      ankleDorsiflexionRightCm: 12.0,
      hipInternalRotationLeftDeg: 34,
      hipInternalRotationRightDeg: 40,
      thoracicRotationLeftDeg: 50,
      thoracicRotationRightDeg: 55,
      cervicalLateralFlexionLeftDeg: 42,
      cervicalLateralFlexionRightDeg: 44,
      tmjOpeningMm: 43,
      lumbarSchoberCm: 5.4
    },
    notes: 'Melhora expressiva da rigidez matinal.'
  }
];

test('calculateAutoregulatedPrescription triggers protective reduction when acute pain or stiffness >= 7', () => {
  const result = calculateAutoregulatedPrescription({
    week: 2,
    morningStiffness: 8,
    acutePainMax: 7,
    daysStagnantRom: 2
  });
  assert.equal(result.status, 'REDUCAO_AGUDA_PROTECTIVA');
  assert.equal(result.adjustedSets, 2);
  assert.ok(result.adjustedTutSeconds < 60);
});

test('calculateAutoregulatedPrescription triggers plateau break when stagnant >= 5 days without acute pain', () => {
  const result = calculateAutoregulatedPrescription({
    week: 2,
    morningStiffness: 4,
    acutePainMax: 3,
    daysStagnantRom: 6
  });
  assert.equal(result.status, 'QUEBRA_PLATÔ_DENSIDADE');
  assert.equal(result.adjustedTutSeconds, 75);
  assert.equal(result.adjustedSets, 4);
});

test('calculateAuditKPIs computes accurate deltas, asymmetries, and reprogramming score', () => {
  const kpis = calculateAuditKPIs(sampleLogs);
  assert.equal(kpis.totalLogs, 2);
  assert.equal(kpis.meanAdherencePct, 90);
  assert.equal(kpis.morningStiffnessDelta, -4);
  assert.equal(kpis.ankleAsymmetryCm, 2.0);
  assert.equal(kpis.hipAsymmetryDeg, 6.0);
  assert.ok(kpis.criticalAsymmetries.length >= 2);
  assert.ok(kpis.posturalReprogrammingScore > 65);
});

test('generateMonthlyAuditPrompt outputs structured 30-day audit prompt with deltas', () => {
  const prompt = generateMonthlyAuditPrompt(sampleLogs, 1, 'Feedback de teste');
  assert.ok(prompt.includes('MESOCICLO #1'));
  assert.ok(prompt.includes('Delta: -4'));
  assert.ok(prompt.includes('Feedback de teste'));
});
