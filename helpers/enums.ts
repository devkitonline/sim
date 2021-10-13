export enum EPostType {
    post,
    page
}

export enum ERole{
    admin= 'a',
    editor='e',
    member='m',
    subscriber='s',
    writer='w'
}

export enum EFormatType {
    audio='a',
    gallery='g',
    image='i',
    post='p',
    video='v'
}

export enum ECommentStatus {
    approved='a',
    waitingForApproved='w'
}

export enum EFilterOperator {
    equals,
    oneof,
    empty,
    notempty,
    true,
    false,
    contains,
    ncontains,
    greater,
    gequal,
    less,
    lequal,
    between,
    betweend,
    today,
    past,
    future,
    thismonth,
    nextmonth,
    thisyear,
    inndays,
    thisday,
    ndaysago,
    inlastndays,
    lastndays
}
