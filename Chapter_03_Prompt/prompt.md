# teps to Follow for Effective Prompt Engineering
1. │ Define the Goal │
2. │ Gather Context │
3. │ Choose Prompting Strategy │
4. │ Structure the Prompt │
5. │ Add Constraints │
6. │ Test and Iterate │
7. │ Document and Reuse │


---

> Create testcase for app.vwo.com

## Step 1: Define the Goal
**Ask yourself:**

- What exactly do I need?
- What will I do with the output?
- What does success look like?
```
❌ Vague: "Help me with testing"
✅ Clear: "Generate 10 test cases for login validation"
```
> Plan -> Generate  (AI) - RULE 1-  (95% Plan , 5% Action)

Objective - I have a website which is app.vwo.com. My objective is to basically write the 10 test cases related to valid and invalid scenarios. This is also called functional test cases in the Jira format. In the Jira format, make sure that we include all the columns which are required. 



## Step 2: Gather Context
**Collect all relevant information:**

- [x]  PRD / Requirements document
- [x]  API documentation
- [x]  Screenshots / UI mockups
- [x]  Error logs
- [x]  Previous test cases
- [x]  Constraints / Limitations
- [x]  JIRA ID, Stories , Epic, BRD, Conflueces, Wireframes, figma, Artch. Miro..
**Rule:** More context = Better output



## Step 3: Choose Prompting Strategy
<u>Zero-Shot -></u>  don't give any example,  it is mostly used when you want to do a very simple task like summarize, fix grammar, write an email 

![image.png](https://eraser.imgix.net/workspaces/xVHRtTGAqlpb3CtKgKii/WWS31TdyovhjTB1TVo9v2jWpPei1/image_Vp0K8jyBfvb-GuemwMB2u.png?ixlib=js-3.8.0 "image.png")



**Few Shot :**   basically, means you will give one or two examples to AI so that it understands what you want 

![image.png](https://eraser.imgix.net/workspaces/xVHRtTGAqlpb3CtKgKii/WWS31TdyovhjTB1TVo9v2jWpPei1/image_rRCfuXb9DQJVGSfE78W5R.png?ixlib=js-3.8.0 "image.png")



**Precise Shot**

```
okay, so here is exactly one of the test cases which I want to give you. The first test case will be verified with the varied credentials: if I enter a username or email ID or password and click on the submit button, I should get an error. This is one of the bugs which we have basically got, and for that we need a test case in proper format where proper Jira IDs will be there
```
**Chain of Thought** 

![image.png](https://eraser.imgix.net/workspaces/xVHRtTGAqlpb3CtKgKii/WWS31TdyovhjTB1TVo9v2jWpPei1/image_2Ef_lja4p84i_FRb6pnBe.png?ixlib=js-3.8.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/xVHRtTGAqlpb3CtKgKii/WWS31TdyovhjTB1TVo9v2jWpPei1/image_0n6qJSa7dxnrcttKrcEpl.png?ixlib=js-3.8.0 "image.png")



Test Case Template - [docs.google.com/spreadsheets/d/1EH1UJ9Qezgx_aZ0xim3KcVJUCEeR7A-7/edit?usp=sharing&ouid=104755920778477387077&rtpof=true&sd=true](https://docs.google.com/spreadsheets/d/1EH1UJ9Qezgx_aZ0xim3KcVJUCEeR7A-7/edit?usp=sharing&ouid=104755920778477387077&rtpof=true&sd=true) 



## Step 4: Structure the Prompt
 More than 27+ prompt framework which you can use.



