import {CloudFormationClient, DescribeStacksCommand} from "@aws-sdk/client-cloudformation";
import {credentials, defaultRegion} from "core/Services/cli";


export const CFClient = new CloudFormationClient([{
  region     : defaultRegion(),
  credentials: credentials(),
}])


export async function CFOutputs(stackName: string) {
  const command  = new DescribeStacksCommand({
          StackName: stackName,
        }),
        response = await CFClient.send(command);

  return response?.Stacks?.[0]?.Outputs?.reduce((result, elem) => {
    if (elem.OutputKey && elem.OutputValue) {
      result[elem.OutputKey] = elem.OutputValue;
    }
    return result;
  }, {} as Record<string, string>);
}
