
relatedReports.[x].reportType === *Offense/Incident .narrative

{{#path this query="$.offenses[?(@.offenseOrder === 1)].suspects[0].mark43Id"}}
{{#assign this.[0]}}{{/assign}}
{{/path}}
{{#path this query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{#assign this.[0]}}{{/assign}}
{{/path}}

// New handlebar for Dunbar:
{{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}
{{this.[0]}}
{{/path}}


// Add a checkbox that allows you to choose which narrative you want on your arrest report?

{{#path this query="$.offenses[?@.offenseOrder === 1)].witnesses[0].mark43Id"}}


/* Might be helpful for Sort later:

An example is [(@.length-1)] which selects the last item in an array. Here, length refers to the length of the current array rather than a JSON field named length.

*/




// Age:
{{#path this query="$.offenses[0].suspects[0].mark43Id"}}{{#assign this}}{{/assign}}{{/path}}{{#path this query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile.dateOfBirth"}}{{#assign this.[0]}}{{/assign}}{{/path}}{{getAge this dob="assignObjectVar"}}
// what he has:

{{#path this query="$.offenses[?(@.offenseOrder === 1)].suspects[0].mark43Id"}}
{{#assign this.[0]}}{{/assign}}
{{/path}}
{{#path this query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile.dateOfBirth"}}
{{#assign this.[0]}}{{/assign}}
{{/path}}
{{getAge this dob="assignObjectVar"}}


offenseCodeType.displayValue

personProfile.nameIdentifiers.0.identifier



// CHP request

/* 
When to print no Narrative in the report?: 216s - only have the narrative on the final person arrested.


Create a tool to assemble a list from different places (related to grabbing PDF data from reports)
*/


{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
//{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@.displayAbbreviation in ['WIT', 'PASS', 'VIC'])]^^^^"}}
{{#assign this.[0].personProfile}}{{/assign}}
{{/path}}
{{#path assignObjectVar query="$.nameIdentifiers[?(@.nameIdentifierType.displayAbbreviation === 'BN')]^^"}}
{{#assign this.[0]}}{{/assign}}
{{/path}}
{{#if assignObjectVar}}{{assignObjectVar.firstName}}{{assignObjectVar.nameIdentifiers.[0].identifier}}
{{else}}
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
  {{#if this.[0].personProfile.lastName}}{{this.[0].personProfile.lastName}}, {{/if}}
  {{#if this.[0].personProfile.firstName}}{{this.[0].personProfile.firstName}} {{/if}}
  {{#if this.[0].personProfile.middleName}}{{this.[0].personProfile.middleName}}{{/if}}
{{/path}}{{/if}}

// Report -> Look at all involvedPeople -> look at all nameReportLinks -> look at all subjectTypes that have a displayAbbreviation value of 'WIT', 'PASS', or 'VIC' -> ^^^^ = go back up 4 levels to 'Report'
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
//{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@.displayAbbreviation in ['WIT', 'PASS', 'VIC'])]^^^^"}}

// Sets assignObjectVar to equal the first person profile having a match for WIT, PASS, VIC?
{{#assign this.[0].personProfile}}{{/assign}}
{{/path}}

// Uses the first person match from above and checks if that person has a nameIdentifiersType abbreviation of 'BN'
{{#path assignObjectVar query="$.nameIdentifiers[?(@.nameIdentifierType.displayAbbreviation === 'BN')]^^"}}

// Sets assignObjectVar to equal the first nameIdentifiers to match 'BN' of the first personProfile
{{#assign this.[0]}}{{/assign}}
{{/path}}

// If the first personProfile that was a WIT, PASS, or VIC has a nameIdentiferType Abbreviation of 'BN', print their first name & identifier
{{#if assignObjectVar}}{{assignObjectVar.firstName}}{{assignObjectVar.nameIdentifiers.[0].identifier}}
{{else}}

// If the first personProfile that was a WIT, PASS, or VIC does not match the 'BN' abbreviation, check for last/first/middle names and print all that exist
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
  {{#if this.[0].personProfile.lastName}}{{this.[0].personProfile.lastName}}, {{/if}}
  {{#if this.[0].personProfile.firstName}}{{this.[0].personProfile.firstName}} {{/if}}
  {{#if this.[0].personProfile.middleName}}{{this.[0].personProfile.middleName}}{{/if}}
{{/path}}{{/if}}


{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
{{#assign this.[3].personProfile}}{{/assign}}
{{assignObjectVar}}
{{/path}}



// Gregory question on changing from item owner to vehicle owner:
{{#path this query="$.report.involvedVehicles.[0].vehicle.itemProfile.linkedNames[?(@.nameItemAssociation.displayAbbreviation === 'IOWN')]"}}
{{#assign this.[0].personId}}{{/assign}}
{{/path}}
{{#path this query="$.report.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{this.[0].firstName}} {{this.[0].lastName}}
{{/path}}




{{#path report query="$.customData.Arrest202New.[0].customProperties.reportOrigin.display"}}
{{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}{{this.[0]}}{{/path}}



{{#if report.customData.Arrest202New.[0].customProperties.reportOrigin.display === 'Arrest Report'}}{{report.customData.Arrest202New.[0].customProperties.reportOrigin.display}}{{/if}}


// This sets the display to assignObjectVar
{{#path this query="$.report.customData.Arrest202New.[0].customProperties.reportOrigin.display"}}
{{#assign this}}{{/assign}}{{/path}}
{{#if assignObjectVar}}{{assignObjectVar}}{{/if}}

// This sets assignObjectVar only if it's an arrest report
{{#path this query="$.report.customData.Arrest202New[?(@.customProperties.reportOrigin.display === 'Arrest Report')]"}}
{{#assign this}}{{/assign}}{{/path}}
{{#if assignObjectVar}}{{report.narrative}}
{{else}}
{{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}{{this.[0]}}{{/path}}
{{/if}}

// Dunbar's version:
{{#path this query="$.report.customData.Arrest202New[?(@.customProperties.reportOrigin.display === 'Arrest Report')]"}}
{{#assign this}}{{/assign}}{{/path}}
{{#if assignObjectVar}}{{report.narrative}}
{{else}}
{{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}{{this.[0]}}{{/path}}
{{/if}}

{{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}{{this.[0]}}{{/path}}



{{#path this query="$.suspects[*].mark43Id"}}{{#assign this}}{{/assign}}{{/path}}
{{#each @root.assignObjectVar}}
    {{#assign this}}{{/assign}}
    {{#path @root query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
        {{#with this.[0] as | personProfile |}}
            {{personProfile.firstName}} {{personProfile.lastName}} - Age:  {{getAge personProfile dob="dateOfBirth"}} Affiliation: {{personProfile.citizenship.displayValue}} Affiliation Area: {{personProfile.maritalStatus.displayValue}}
        {{/with}}
    {{/path}}
{{/each}}

{{#each [involvedProfiles].[involvedLocations]}}
{{fullAddress}}
{{else}}
{{/each}}

{{{<div></div>}}}


{{#path this query="$.reportingParties.[0].mark43Id"}}{{#assign this}}{{/assign}}{{/path}}
{{#path this query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{#assign this.[0]}}{{/assign}}{{/path}}{{assignObjectVar.firstName}}


{{dateTime arrest.arrestDateUtc format="dateTime"}}


{{#path this query="$.offenses[?(@.offenseOrder === 1)].suspects[0].mark43Id"}}{{#assign this.[0]}}{{/assign}}{{/path}}
{{#path this query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{#assign this.[0]}}{{/assign}}{{/path}}
{{#with assignObjectVar}}{{firstName}} {{middleName}} {{lastName}} {{/with}}

{{#path this query="$.reportTakenLocation"}}{{#assign this}}{{/assign}}{{/path}}
{{#with assignObjectVar}}{{streetNumber}}{{streetName}}{{/with}}


{{#assign mark43Id}}{{/assign}}
{{#path @root query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{#with this.[0]}}{{firstName}} {{lastName}}{{/with}}
{{/path}}


{{#if offenseAttributes.[0].attribute.attributeType === "WEAPON_OR_FORCE_INVOLVED"}}{{offenseAttributes.[0].attribute.displayValue}}{{/if}}

{{#if this query="$.offenseAttributes.[0].attribute.attributeType === 'WEAPON_OR_FORCE_INVOLVED'"}}{{offenseAttributes.[0].attribute.displayValue}}{{/if}}

{{#path this query="$.report.customData.Arrest202New[?(@.customProperties.reportOrigin.display === 'Arrest Report')]"}}
{{#assign this}}{{/assign}}{{/path}}


// Trying to figure out Weapon / Homicide pathing
offenses.0.offenseAttributes.0.attribute.attributeType === WEAPON_OR_FORCE_INVOLVED / GANG_INFORMATION / HOMICIDE_CIRCUMSTANCE

{{#if offenseAttributes.[0].attribute.attributeType === 'WEAPON_OR_FORCE_INVOLVED'}}123{{/if}}

{{#path this query="$.offenses[*].offenseAttributes[*].attribute[?@property === 'attributeType' && @.match(/^WEAPON_OR_FORCE_INVOLVED$|^GANG_INFORMATION$|^HOMICIDE_CIRCUMSTANCE$/))]^^^^"}}
{{#assign this}}{{/assign}}{{/path}}

{{#path this query="$.offenses[*].offenseAttributes[*].attribute.attributeType === 'WEAPON_OR_FORCE_INVOLVED'"}}{{#assign this}}{{/assign}}{{/path}}
{{#if assignObjectVar}}
{{this.offenseAttributes.[0].attribute.displayValue}}{{/if}}




// Handlebar to repeat through a list of suspects, grab each ID, and print out their first / last name
{{#each [suspects]}}
{{#assign mark43Id}}{{/assign}}
{{#path @root query="$.involvedPeople[?(@.personProfile.metadata.mark43Id === @root.assignObjectVar)].personProfile"}}
{{#with this.[0]}}{{firstName}} {{lastName}}{{/with}}{{/path}}, {{/each}}


// Handlebar for listing people in order by their linkTypeSequenceNumber
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
{{listIndex this "personProfile.lastName" 1 "linkTypeSequenceNumber"}}, 
{{listIndex this "personProfile.firstName" 1 "linkTypeSequenceNumber"}} 
{{listIndex this "personProfile.middleName" 1 "linkTypeSequenceNumber"}}
{{/path}}

//Person's full address
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
{{listIndex this "personProfile.homeAddresses.[0].fullAddress" 1 "linkTypeSequenceNumber"}}
{{/path}}

//Person's concise address
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
{{listIndex this "personProfile.homeAddresses.[0].streetNumber" 1 "linkTypeSequenceNumber"}}
{{listIndex this "personProfile.homeAddresses.[0].streetName" 1 "linkTypeSequenceNumber"}}
{{listIndex this "personProfile.homeAddresses.[0].locality" 1 "linkTypeSequenceNumber"}},
{{listIndex this "personProfile.homeAddresses.[0].administrativeAreaLevel1" 1 "linkTypeSequenceNumber"}}
{{listIndex this "personProfile.homeAddresses.[0].postalCode" 1 "linkTypeSequenceNumber"}}
{{/path}}



{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$/))]^^^^.personProfile"}} 
{{#if this.[3].homeAddresses.[0].streetNumber}}
{{this.[3].homeAddresses.[0].streetNumber}} 
{{this.[3].homeAddresses.[0].streetName}}, 
{{this.[3].homeAddresses.[0].locality}}, 
{{this.[3].homeAddresses.[0].administrativeAreaLevel1}} 
{{this.[3].homeAddresses.[0].postalCode}}{{/if}} {{/path}}


//Peron's phone number
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^WIT$|^PASS$|^VIC$/))]^^^^"}}
{{listIndex this "personProfile.namePhoneNumbers.[0].displayNumber" 1 "linkTypeSequenceNumber"}}
{{/path}}



// Handlebar for conditionally rendering a narrative based on label
{{#path this query="$.relatedReports[0].reportAttributes[?(@.attribute.displayAbbreviation === 'ON')]"}}
{{#assign this.[0]}}{{/assign}}{{/path}}
{{#if assignObjectVar}}
  {{report.narrative}}
{{else}}
  {{#path this query="$.relatedReports[0].reportAttributes[?(@.attribute.displayAbbreviation === 'SN')]"}}
  {{#assign this.[0]}}{{/assign}}{{/path}}
  {{#if assignObjectVar}}
  {{else}}
    {{relatedReports.[0].narrative}}
  {{/if}}
{{/if}}



{{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62287430467)]"}}
{{#assign this}}{{/assign}}
{{/path}}
{{assignObjectVar}}{{#if assignObjectVar}}  {{report.narrative}}
{{else}}  
{{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}  
{{#assign this.[0]}}{{/assign}}{{/path}}  {{#if assignObjectVar}}  {{else}}    {{relatedReports.[0].narrative}}  {{/if}}{{/if}}




  {{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}{{#assign this}}{{/assign}}{{/path}}{{#if assignObjectVar}}
  {{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}{{this}}{{/path}}{{else}}{{report.narrative}}{{/if}}



  // Handlebar to try pulling in each desired narrative to display on the final export narrative template
  O/I Narrative: {{report.narrative}} {{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542910)]"}}{{#each this as | currentReport |}}{{#path currentReport query="$.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}{{#unless this}} {{currentReport.narrative}} {{currentReport.metadata.mark43Id}}{{else}}Skipping Narrative due to label {{currentReport.metadata.mark43Id}}{{/unless}}{{/path}}{{/each}}{{/path}}


NPA ID=  62287432779
PA ID=   62287430467
Skip Narrative - 62305111525
NPA label = Use OI narrative
PA label = Use current report narrative
Skip Narrative label = display <nothing> for narrative

// Checks if the NPA label is on the report.  If it is, grabs the OI report's narrative and prints that.
// Else, prints the current report's narrative
{{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}
{{#assign this}}{{/assign}}{{/path}}
{{#if assignObjectVar}}
  {{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}
  {{this}}{{/path}}
{{else}}
  {{report.narrative}}{{/if}}


// This is the above + functionality for Skip Narrative label
  {{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}
  {{#assign this}}{{/assign}}{{/path}}
  {{#if assignObjectVar}}
  {{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542916)].narrative"}}
  {{this}}{{/path}}
  {{else}}
  {{#path this query="$.report.reportAttributes[?(@.attribute.mark43Id === 62305111525)]"}}
  {{#assign this}}{{/assign}}{{/path}}
  {{#if assignObjectVar}}
  {{else}}
  {{report.narrative}}{{/if}}{{/if}}


  // This is to show all narratives associated to an OI depending on label
  O/I Narrative: {{report.narrative}} 
  {{#path this query="$.relatedReports[?(@.reportDefinitionId === 49344542910)]"}}
  {{#each this as | currentReport |}}
  {{#path currentReport query="$.reportAttributes[?(@.attribute.mark43Id === 62287432779)]"}}
  {{#unless this}} {{currentReport.narrative}} {{currentReport.metadata.mark43Id}}
  {{else}}Skipping Narrative due to label 
  {{currentReport.metadata.mark43Id}}{{/unless}}{{/path}}{{/each}}{{/path}}

  
  // TCOLE asks:
  {{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^FFDEX$/))]^^^^"}}
  {{#if this.[0].personProfile.lastName}}{{this.[0].personProfile.lastName}}, {{/if}}
  {{#if this.[0].personProfile.firstName}}{{this.[0].personProfile.firstName}} {{/if}}
  {{#if this.[0].personProfile.middleName}}{{this.[0].personProfile.middleName}}{{/if}}
{{/path}}

// email:
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^FFDEX$/))]^^^^"}}
{{#if this.[0].personProfile.nameEmails.[0].emailAddress}}
{{this.[0].personProfile.nameEmails.[0].emailAddress}}
{{/if}}{{/path}}

// home address:
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^FFDEX$/))]^^^^"}}
{{#if this.[0].personProfile.homeAddresses.[0].fullAddress}}
{{#with this.[0].personProfile.homeAddresses.[0]}}{{streetNumber}} {{streetName}} {{locality}}, {{administrativeAreaLevel1}} {{postalCode}} {{/with}}
{{/if}}{{/path}}

// Agency applied to:
{{#path report query="$.involvedOrganizations[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^APPTAG$/))]^^^^"}}
{{#if this.[0].organizationProfile.name}}{{this.[0].organizationProfile.name}}, {{/if}}
{{/path}}

// PID Number:
{{#path report query="$.involvedPeople[*].nameReportLinks[*].subjectType[?(@property === 'displayAbbreviation' && @.match(/^FFDEX$/))]^^^^"}}
{{#if this.[0].personProfile.stateIdNumber}}
{{this.[0].personProfile.stateIdNumber}}
{{/if}}{{/path}}


// Weapon_Or_Force_Involved:
{{#path this query="$.offenseAttributes[*].attribute[?(@property === 'attributeType' && @.match(/^WEAPON_OR_FORCE_INVOLVED$/))]^"}}
{{#if this.[0].attributeType}}{{this.[0].displayValue}}
{{/if}}{{/path}}

// Location Category:
{{#path this query="$.offenseLocation.category[?(@property === 'attributeType' && @.match(/^LOCATION_CATEGORY$/))]^"}}
{{#if this.attributeType}}{{this.displayValue}}
{{/if}}{{/path}}

// Agency on a repeating Offense:
{{#path @root query="$.agency.agencyAbbreviation"}}
{{this}}
{{/path}}