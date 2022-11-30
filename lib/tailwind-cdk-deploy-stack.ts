import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TailwindCdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = "tailwind-cdk-deploy-stack";
    const staticBucket = new cdk.aws_s3.Bucket(this, bucketName, {
        bucketName: bucketName,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        websiteIndexDocument: "index.html",
    });

    const staticBucketOpenPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [new cdk.aws_iam.ArnPrincipal('*')],
      resources: [staticBucket.bucketArn + '/*'],
    });

    staticBucket.addToResourcePolicy(staticBucketOpenPolicy);

    // Deploy index.html to s3 bucket
    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployTargetFiles', {
      sources: [cdk.aws_s3_deployment.Source.asset('./tailwind/src', { exclude: ['*', '!index.html'] })],
      destinationBucket: staticBucket,
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployImages', {
      sources: [cdk.aws_s3_deployment.Source.asset('./tailwind/img')],
      destinationBucket: staticBucket,
      destinationKeyPrefix: 'img'
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployOutputCss', {
      sources: [cdk.aws_s3_deployment.Source.asset('./tailwind/dist')],
      destinationBucket: staticBucket,
      destinationKeyPrefix: 'dist'
    });
    
  }
}
