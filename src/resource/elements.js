
const lifeCycle = require('./Lifecycle.json');

const elements = (lifeCycle) => {
    return [
        {
            "Id": "b07e229c-cc83-4ee7-be7d-aa1b0126bd28",
            "Name": "In Production Planning",
            "DisplayName": "In Production Planning",
            "StateIndex": 0,
            "Actions": [
                {
                    "Id": "f42878ac-5ae5-47d0-b9e2-aa1b0126bd28",
                    "Name": "Start Reinforcement",
                    "DisplayName": null,
                    "TargetStateId": "3ca41433-1244-4938-bc56-aa1b0126bd28",
                },
                // {
                //     "Id": "f42878ac-5ae5-47d0-b9e2-aa1b0126bd29",
                //     "Name": "Start Reinforcement",
                //     "DisplayName": null,
                //     "TargetStateId": "3ca41433-1244-4938-bc56-aa1b0126bd28",
                // },
            ]
        },
        {
            "Id": "3ca41433-1244-4938-bc56-aa1b0126bd28",
            "Name": "In Reinforcement",
            "DisplayName": "In Reinforcement",
            "StateIndex": 1,
            "Actions": [
                {
                    "Id": "9dc9117a-3d07-4a0e-ad3b-aa1b0126bd28",
                    "Name": "Send to Steelyard",
                    "DisplayName": null,
                    "ActionType": 1,
                    "TargetStateId": "a897e9ee-b840-43c5-b7cc-aa1b0126bd28",
                }
            ]

        },
        {
            "Id": "a897e9ee-b840-43c5-b7cc-aa1b0126bd28",
            "Name": "In Reinforcement",
            "DisplayName": "In Post Reinforcement",
            "StateIndex": 2,
            "Actions": [
                {
                    "Id": "9dc9117a-3d07-4a0e-ad3b-aa1b0126bd28",
                    "Name": "Back to Planning",
                    "DisplayName": null,
                    "ActionType": 1,
                    "TargetStateId": "b07e229c-cc83-4ee7-be7d-aa1b0126bd28",
                }
            ]

        }

    ]
}

export default elements;