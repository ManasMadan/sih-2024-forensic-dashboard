import { getCase } from "@/actions/case";
import { getUsers } from "@/actions/user";
import UpdateCaseComponent from "@/components/Cases/UpdateCaseComponent";
import { auth, User } from "@clerk/nextjs/server";

export default async function UpdateCasePage({
  params,
}: {
  params: { caseId: string };
}) {
  const { userId } = auth();
  const caseData = await getCase(parseInt(params.caseId));
  if (!caseData) return <div>Case Not Found</div>;

  let users = JSON.parse(await getUsers(caseData.userId)) as User[];
  users = users.filter((user) => user.id !== userId);

  return <UpdateCaseComponent caseData={caseData} users={users} />;
}
