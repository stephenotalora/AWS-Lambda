# S3 Thumbnail Service

Responds to S3 events on object creation.
Sample object:

```
2018-12-08T21:47:21.712Z	d751d0e4-fb32-11e8-a24d-1b2962478de4	EVENT:
{
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-west-2",
            "eventTime": "2018-12-08T21:47:21.386Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AIDAIUZZ5F23DVIJCUM3I"
            },
            "requestParameters": {
                "sourceIPAddress": "70.68.129.89"
            },
            "responseElements": {
                "x-amz-request-id": "E14FDCA17C0A3155",
                "x-amz-id-2": "BXnNOZrdxe1WiIz5G93mj0Q/TFPkSb7MgDldMZEETRezjGNT80O6WrKDEuWpiCGi8h1fk0FJV/g="
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "11ba0784-e74e-4164-b8c1-4c55b42a7383",
                "bucket": {
                    "name": "rmsoftware-s3-thumbnail-generator",
                    "ownerIdentity": {
                        "principalId": "A3017M7WX445A9"
                    },
                    "arn": "arn:aws:s3:::rmsoftware-s3-thumbnail-generator"
                },
                "object": {
                    "key": "The-Drop-755x425.png",
                    "size": 108212,
                    "eTag": "f9b5ad97eb6eab38f4d4261f0d3ad737",
                    "sequencer": "005C0C3BE943976476"
                }
            }
        }
    ]
}
```

### Dependencies

to install dependencies for lambda deploy 
yarn --production=true

note that `sharp` must be installed under a linux environment for deployment in lambda
see instructions available [here](http://sharp.pixelplumbing.com/en/stable/install/#aws-lambda)