export type TUsefulLinks = {
    title: string
    description: string
}

export type TOurStoryForm = {
    whoWeAre?: string
    ourMission?: string
    ourVision?: string
    ourContribution?: string
    shippingInfoSingle?: string
}

export type TContent = {
    ourStory: TOurStoryForm
    termsAndCondition: TUsefulLinks[]
    privacyPolicy: TUsefulLinks[]
    shippingInformation: TUsefulLinks[]
    returnPolicy: TUsefulLinks[]
    faqs: TUsefulLinks[]
}
