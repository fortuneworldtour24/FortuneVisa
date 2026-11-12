import checklistsJson from '@/data/checklists.json';

export type ChecklistRequirement = {
  id: string;
  label: string;
};

export type Checklist = {
  destinationSlug: string;
  visaType: string;
  requirements: ChecklistRequirement[];
};

export const CHECKLISTS = checklistsJson.items as Checklist[];

export function findChecklist(destinationSlug: string, visaType: string): Checklist | undefined {
  return CHECKLISTS.find(
    (checklist) => checklist.destinationSlug === destinationSlug && checklist.visaType === visaType,
  );
}
