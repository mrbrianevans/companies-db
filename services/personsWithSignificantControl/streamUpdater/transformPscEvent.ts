import {PscEvent} from "./schemas/AnyEvent.js";

/**
 * Extracts the company number and PSC id from the event link and returns an object containing the event data.
 * @param event - psc event from stream
 */
export function addPscIdAndCompanyNumber<EventType extends PscEvent>(event: EventType): EventType['data'] & {company_number: string, psc_id: string}{
  const psc_ids = event.data.links.self.match(/\/company\/([A-Z\d]{8})\/persons-with-significant-control\/(corporate-entity|individual|legal-person)\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from stream: '+JSON.stringify(event.data.links))
  const [,company_number,,psc_id] = psc_ids
  return {...event.data, psc_id, company_number}
}
