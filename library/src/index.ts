export * from "./lib/components/counter-button/counter-button";
export * from "./lib/services/people-service/PeopleService";

// Glob export works, but the typescript type transform does not support it
// export * from "./lib/**/*[^.docs].tsx";
