

const resignedRoles = new Set([2,3,6,7,14,15,16,20,21,22])
const currentRoles = new Set([0,1,4,5,11,12,13,17,18,19])

// there are additional appointment types possible in update records, mainly resigned versions
const updateAppointmentTypes = {
  0: 'secretary',
  1: 'director',
  2: 'resigned-secretary',
  3: 'resigned-director',
  4: 'llp-member',
  5: 'llp-designated-member',
  6: 'resigned-llp-member',
  7: 'resigned-llp-designated-member',
  11: 'judicial-factor',
  12: 'charities-act-receiver-or-manager',
  13: 'caice-act-manager',
  14: 'resigned-judicial-factor',
  15: 'resigned-charities-act-receiver-or-manager',
  16: 'resigned-caice-act-manager',
  17: 'member-of-an-administrative-organ',
  18: 'member-of-a-supervisory-organ',
  19: 'member-of-a-management-organ',
  20: 'resigned-member-of-an-administrative-organ',
  21: 'resigned-member-of-a-supervisory-organ',
  22: 'resigned-member-of-a-management-organ',
  99: 'errored-appointment'
} as const


export class AppointmentType{
  private readonly appointmentTypeCode: number
  constructor(appointmentTypeCode: number) {
    this.appointmentTypeCode = appointmentTypeCode
  }
  get officer_role(){
    //todo: this should never return a role prefixed with resigned-
    return updateAppointmentTypes[this.appointmentTypeCode]
  }
  get resigned(){
    return resignedRoles.has(this.appointmentTypeCode)
  }
  get current(){
    return currentRoles.has(this.appointmentTypeCode)
  }
  get errored(){
    return this.appointmentTypeCode == 99
  }
  get code(){
    return this.appointmentTypeCode
  }
  toJSON(){
    return {
      officer_role: this.officer_role,
      resigned: this.resigned || undefined,
      errored: this.errored || undefined
    }
  }
}
