// @ts-nocheck
import { buildASTSchema } from 'graphql';

const schemaAST = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "SchemaDefinition",
      "operationTypes": [
        {
          "kind": "OperationTypeDefinition",
          "operation": "query",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Query"
            }
          }
        },
        {
          "kind": "OperationTypeDefinition",
          "operation": "mutation",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Mutation"
            }
          }
        },
        {
          "kind": "OperationTypeDefinition",
          "operation": "subscription",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Subscription"
            }
          }
        }
      ],
      "directives": [
        {
          "kind": "Directive",
          "name": {
            "kind": "Name",
            "value": "transport"
          },
          "arguments": [
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "subgraph"
              },
              "value": {
                "kind": "StringValue",
                "value": "UploadService"
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "kind"
              },
              "value": {
                "kind": "StringValue",
                "value": "grpc"
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "location"
              },
              "value": {
                "kind": "StringValue",
                "value": "localhost:4200"
              }
            },
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "options"
              },
              "value": {
                "kind": "ObjectValue",
                "fields": [
                  {
                    "kind": "ObjectField",
                    "name": {
                      "kind": "Name",
                      "value": "requestTimeout"
                    },
                    "value": {
                      "kind": "IntValue",
                      "value": "200000"
                    }
                  },
                  {
                    "kind": "ObjectField",
                    "name": {
                      "kind": "Name",
                      "value": "useHTTPS"
                    },
                    "value": {
                      "kind": "BooleanValue",
                      "value": false
                    }
                  },
                  {
                    "kind": "ObjectField",
                    "name": {
                      "kind": "Name",
                      "value": "roots"
                    },
                    "value": {
                      "kind": "ListValue",
                      "values": [
                        {
                          "kind": "ObjectValue",
                          "fields": [
                            {
                              "kind": "ObjectField",
                              "name": {
                                "kind": "Name",
                                "value": "name"
                              },
                              "value": {
                                "kind": "StringValue",
                                "value": "Root0"
                              }
                            },
                            {
                              "kind": "ObjectField",
                              "name": {
                                "kind": "Name",
                                "value": "rootJson"
                              },
                              "value": {
                                "kind": "StringValue",
                                "value": "{\"nested\":{\"upload\":{\"nested\":{\"v1\":{\"nested\":{\"UploadService\":{\"methods\":{\"StartUpload\":{\"requestType\":\"UploadChunk\",\"requestStream\":true,\"responseType\":\"UploadResult\",\"comment\":null},\"WatchUpload\":{\"requestType\":\"UploadStatusRequest\",\"responseType\":\"UploadStatus\",\"responseStream\":true,\"comment\":null}},\"comment\":null},\"UploadChunk\":{\"fields\":{\"upload_id\":{\"type\":\"string\",\"id\":1,\"comment\":null},\"chunk\":{\"type\":\"bytes\",\"id\":2,\"comment\":null},\"offset\":{\"type\":\"int64\",\"id\":3,\"comment\":null},\"last\":{\"type\":\"bool\",\"id\":4,\"comment\":null}},\"comment\":null},\"UploadResult\":{\"fields\":{\"upload_id\":{\"type\":\"string\",\"id\":1,\"comment\":null},\"status\":{\"type\":\"string\",\"id\":2,\"comment\":null},\"message\":{\"type\":\"string\",\"id\":3,\"comment\":null}},\"comment\":null},\"UploadStatusRequest\":{\"fields\":{\"upload_id\":{\"type\":\"string\",\"id\":1,\"comment\":null}},\"comment\":null},\"UploadStatus\":{\"fields\":{\"upload_id\":{\"type\":\"string\",\"id\":1,\"comment\":null},\"status\":{\"type\":\"string\",\"id\":2,\"comment\":null},\"progress\":{\"type\":\"int32\",\"id\":3,\"comment\":null},\"message\":{\"type\":\"string\",\"id\":4,\"comment\":null}},\"comment\":null}}}}}}}"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "kind": "DirectiveDefinition",
      "name": {
        "kind": "Name",
        "value": "grpcMethod"
      },
      "arguments": [
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "subgraph"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "rootJsonName"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "objPath"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "methodName"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "responseStream"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Boolean"
            }
          },
          "directives": []
        }
      ],
      "repeatable": false,
      "locations": [
        {
          "kind": "Name",
          "value": "FIELD_DEFINITION"
        }
      ]
    },
    {
      "kind": "DirectiveDefinition",
      "name": {
        "kind": "Name",
        "value": "grpcConnectivityState"
      },
      "arguments": [
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "subgraph"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "rootJsonName"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "objPath"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        }
      ],
      "repeatable": false,
      "locations": [
        {
          "kind": "Name",
          "value": "FIELD_DEFINITION"
        }
      ]
    },
    {
      "kind": "DirectiveDefinition",
      "description": {
        "kind": "StringValue",
        "value": "Directs the executor to stream plural fields when the `if` argument is true or undefined.",
        "block": true
      },
      "name": {
        "kind": "Name",
        "value": "stream"
      },
      "arguments": [
        {
          "kind": "InputValueDefinition",
          "description": {
            "kind": "StringValue",
            "value": "Stream when true or undefined.",
            "block": true
          },
          "name": {
            "kind": "Name",
            "value": "if"
          },
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Boolean"
              }
            }
          },
          "defaultValue": {
            "kind": "BooleanValue",
            "value": true
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "description": {
            "kind": "StringValue",
            "value": "Unique name",
            "block": true
          },
          "name": {
            "kind": "Name",
            "value": "label"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "description": {
            "kind": "StringValue",
            "value": "Number of items to return immediately",
            "block": true
          },
          "name": {
            "kind": "Name",
            "value": "initialCount"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Int"
            }
          },
          "defaultValue": {
            "kind": "IntValue",
            "value": "0"
          },
          "directives": []
        }
      ],
      "repeatable": false,
      "locations": [
        {
          "kind": "Name",
          "value": "FIELD"
        }
      ]
    },
    {
      "kind": "DirectiveDefinition",
      "name": {
        "kind": "Name",
        "value": "transport"
      },
      "arguments": [
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "subgraph"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "kind"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "location"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "options"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "TransportOptions"
            }
          },
          "directives": []
        }
      ],
      "repeatable": true,
      "locations": [
        {
          "kind": "Name",
          "value": "SCHEMA"
        }
      ]
    },
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "Query"
      },
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_v1_UploadService_connectivityState"
          },
          "arguments": [
            {
              "kind": "InputValueDefinition",
              "name": {
                "kind": "Name",
                "value": "tryToConnect"
              },
              "type": {
                "kind": "NamedType",
                "name": {
                  "kind": "Name",
                  "value": "Boolean"
                }
              },
              "directives": []
            }
          ],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ConnectivityState"
            }
          },
          "directives": [
            {
              "kind": "Directive",
              "name": {
                "kind": "Name",
                "value": "grpcConnectivityState"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "subgraph"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "rootJsonName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "Root0"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "objPath"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "upload.v1.UploadService"
                  }
                }
              ]
            }
          ]
        }
      ],
      "interfaces": [],
      "directives": []
    },
    {
      "kind": "EnumTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "ConnectivityState"
      },
      "values": [
        {
          "kind": "EnumValueDefinition",
          "name": {
            "kind": "Name",
            "value": "IDLE"
          },
          "directives": []
        },
        {
          "kind": "EnumValueDefinition",
          "name": {
            "kind": "Name",
            "value": "CONNECTING"
          },
          "directives": []
        },
        {
          "kind": "EnumValueDefinition",
          "name": {
            "kind": "Name",
            "value": "READY"
          },
          "directives": []
        },
        {
          "kind": "EnumValueDefinition",
          "name": {
            "kind": "Name",
            "value": "TRANSIENT_FAILURE"
          },
          "directives": []
        },
        {
          "kind": "EnumValueDefinition",
          "name": {
            "kind": "Name",
            "value": "SHUTDOWN"
          },
          "directives": []
        }
      ],
      "directives": []
    },
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "Mutation"
      },
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_v1_UploadService_StartUpload"
          },
          "arguments": [
            {
              "kind": "InputValueDefinition",
              "name": {
                "kind": "Name",
                "value": "input"
              },
              "type": {
                "kind": "NamedType",
                "name": {
                  "kind": "Name",
                  "value": "File"
                }
              },
              "directives": []
            }
          ],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "upload__v1__UploadResult"
            }
          },
          "directives": [
            {
              "kind": "Directive",
              "name": {
                "kind": "Name",
                "value": "grpcMethod"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "subgraph"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "rootJsonName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "Root0"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "objPath"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "upload.v1.UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "methodName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "StartUpload"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "responseStream"
                  },
                  "value": {
                    "kind": "BooleanValue",
                    "value": false
                  }
                }
              ]
            }
          ]
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_v1_UploadService_WatchUpload"
          },
          "arguments": [
            {
              "kind": "InputValueDefinition",
              "name": {
                "kind": "Name",
                "value": "input"
              },
              "type": {
                "kind": "NamedType",
                "name": {
                  "kind": "Name",
                  "value": "upload__v1__UploadStatusRequest_Input"
                }
              },
              "directives": []
            }
          ],
          "type": {
            "kind": "ListType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "upload__v1__UploadStatus"
              }
            }
          },
          "directives": [
            {
              "kind": "Directive",
              "name": {
                "kind": "Name",
                "value": "grpcMethod"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "subgraph"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "rootJsonName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "Root0"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "objPath"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "upload.v1.UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "methodName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "WatchUpload"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "responseStream"
                  },
                  "value": {
                    "kind": "BooleanValue",
                    "value": true
                  }
                }
              ]
            }
          ]
        }
      ],
      "interfaces": [],
      "directives": []
    },
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "upload__v1__UploadResult"
      },
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_id"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "status"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "message"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        }
      ],
      "interfaces": [],
      "directives": []
    },
    {
      "kind": "ScalarTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "File"
      },
      "directives": []
    },
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "upload__v1__UploadStatus"
      },
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_id"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "status"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "progress"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "Int"
            }
          },
          "directives": []
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "message"
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        }
      ],
      "interfaces": [],
      "directives": []
    },
    {
      "kind": "InputObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "upload__v1__UploadStatusRequest_Input"
      },
      "fields": [
        {
          "kind": "InputValueDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_id"
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          },
          "directives": []
        }
      ],
      "directives": []
    },
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "Subscription"
      },
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "upload_v1_UploadService_WatchUpload"
          },
          "arguments": [
            {
              "kind": "InputValueDefinition",
              "name": {
                "kind": "Name",
                "value": "input"
              },
              "type": {
                "kind": "NamedType",
                "name": {
                  "kind": "Name",
                  "value": "upload__v1__UploadStatusRequest_Input"
                }
              },
              "directives": []
            }
          ],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "upload__v1__UploadStatus"
            }
          },
          "directives": [
            {
              "kind": "Directive",
              "name": {
                "kind": "Name",
                "value": "grpcMethod"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "subgraph"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "rootJsonName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "Root0"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "objPath"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "upload.v1.UploadService"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "methodName"
                  },
                  "value": {
                    "kind": "StringValue",
                    "value": "WatchUpload"
                  }
                },
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "responseStream"
                  },
                  "value": {
                    "kind": "BooleanValue",
                    "value": true
                  }
                }
              ]
            }
          ]
        }
      ],
      "interfaces": [],
      "directives": []
    },
    {
      "kind": "ScalarTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "TransportOptions"
      },
      "directives": []
    }
  ]
};

export default buildASTSchema(schemaAST, {
  assumeValid: true,
  assumeValidSDL: true
});