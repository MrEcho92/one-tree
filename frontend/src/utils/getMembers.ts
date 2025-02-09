import { MemberId } from '../types/tree';
export function getMemberNames(
  members: any[],
  memberIds: string[],
): MemberId[] {
  const data: MemberId[] = [];
  memberIds.forEach((memberId: string) => {
    const member = members.find((item: any) => item.id === memberId);
    if (member !== undefined) {
      const firstName = member.first_name;
      const lastName = member.last_name;
      data.push({
        id: member.id,
        fullName: `${firstName} ${lastName ?? ''}`,
        gender: member.gender,
      });
    }
  });

  return data;
}
