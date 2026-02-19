#!/bin/bash
PROJECT_ID="PVT_kwDOCtphAM4Ao7bH"
PROJECT_NUMBER=2
OWNER="LumiaEIP"
REPO="LumiaEIP/pre-prod"
STATUS_FIELD_ID="PVTSSF_lADOCtphAM4Ao7bHzgga4tw"

# Status Option IDs
TODO="f75ad846"
IN_PROGRESS="47fc9ee4"
CODE_REVIEW="a4934e36"
DELIVERED="98236657"

# List of old items to delete at the end
# (I'll just delete them all at once after creating new ones)

declare -a items=(
  "[BACKEND] Implement core User and Authentication REST controllers|$DELIVERED|Endpoints for user registration, login and profile management."
  "[BACKEND] Global Exception Handling and Error Response Refactoring|$CODE_REVIEW|Standardize API error responses and validation logic."
  "[ARCH] Database schema normalization and entity refactoring|$DELIVERED|Clean up MongoDB collections and Spring Data entities."
  "[DATA] Migration from MySQL to MongoDB and repository implementation|$DELIVERED|Switch to document storage for better scalability."
  "[BACKEND] Implement user script upload and Cluster Manager communication|$DELIVERED|Service to handle .py files and trigger training sessions."
  "[SECURITY] Implement password encryption and secure storage|$DELIVERED|Integration of BCrypt for sensitive data protection."
  "[INFRA] Setup Docker environment and configuration management|$DELIVERED|Compose file setup and environment variable injection."
  "[BACKEND] Refine security filters and CORS policy for frontend|$DELIVERED|Fix authorization issues in development and production."
  "[FRONT] Accessibility audit and UI/UX core improvements|$TODO|Implement ARIA labels and keyboard navigation."
  "[TEST] Comprehensive Unit and Integration Testing for Backend|$IN_PROGRESS|Ensure 80%+ coverage for business logic."
  "[INFRA] Integration: Backend to Training Cluster Manager Orchestration|$DELIVERED|Seamless communication between API and Docker containers."
  "[INFRA] Containerization: Multi-service deployment with Docker Compose|$DELIVERED|Full stack local and cloud orchestration."
  "[BACKEND] API: Fetch latest platform reviews and user feedback|$TODO|Landing page component support."
  "[BACKEND] API: Detailed User Profile and statistics aggregation|$DELIVERED|Level, XP, and game history tracking."
  "[BACKEND] API: Platform rating calculation and metrics|$TODO|Summarize user ratings across games."
  "[INFRA] Cluster Manager REST API for remote agent execution|$DELIVERED|FastAPI implementation on the training node."
  "[INFRA] Remote VPS Database instance setup and seeding|$DELIVERED|Configure MongoDB in the cloud environment."
  "[BACKEND] API: Achievement system and progress tracking|$IN_PROGRESS|Logic for unlocking badges and trophies."
  "[BACKEND] API: Game analytics and popularity ranking|$TODO|Track which games are played most."
  "[BACKEND] API: Badge metadata and reward distribution service|$TODO|Graphic assets and level-up rewards."
  "[BACKEND] API: Global leaderboard implementation for AI agents|$CODE_REVIEW|Rank agents by win rate and score."
  "[INFRA] Automated deployment pipeline and security hardening|$DELIVERED|CI/CD for the backend and cluster manager."
  "[BACKEND] API: User agent dashboard and training monitor|$DELIVERED|List user's active and finished trainings."
  "[BACKEND] API: Subscription plans and pricing metadata|$TODO|Management of premium tiers and features."
  "[FRONT] Implement 'About Us' and team documentation pages|$DELIVERED|Static pages for project presentation."
)

for item in "${items[@]}"; do
  IFS="|" read -r TITLE STATUS_ID BODY <<< "$item"
  echo "Processing: $TITLE"
  
  # Create issue
  ISSUE_URL=$(gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" --json url --jq .url)
  
  # Add to project
  ITEM_ID=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "$ISSUE_URL" --format json --jq .id)
  
  # Set status
  gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$STATUS_FIELD_ID" --single-select-option-id "$STATUS_ID"
done

# Delete old items
echo "Deleting old draft items..."
OLD_ITEMS=(
  "PVTI_lADOCtphAM4Ao7bHzgT8FvA" "PVTI_lADOCtphAM4Ao7bHzgT8F1E" "PVTI_lADOCtphAM4Ao7bHzgT8GA4"
  "PVTI_lADOCtphAM4Ao7bHzgU26Mc" "PVTI_lADOCtphAM4Ao7bHzgWVSWQ" "PVTI_lADOCtphAM4Ao7bHzgUD4v8"
  "PVTI_lADOCtphAM4Ao7bHzgUD4pg" "PVTI_lADOCtphAM4Ao7bHzgT6gj4" "PVTI_lADOCtphAM4Ao7bHzgT1otM"
  "PVTI_lADOCtphAM4Ao7bHzgT8F4M" "PVTI_lADOCtphAM4Ao7bHzgWTDZk" "PVTI_lADOCtphAM4Ao7bHzgWVR5I"
  "PVTI_lADOCtphAM4Ao7bHzgWVGBQ" "PVTI_lADOCtphAM4Ao7bHzgWVGB8" "PVTI_lADOCtphAM4Ao7bHzgWVGAk"
  "PVTI_lADOCtphAM4Ao7bHzgWYLtc" "PVTI_lADOCtphAM4Ao7bHzgWXq1o" "PVTI_lADOCtphAM4Ao7bHzgWVGDw"
  "PVTI_lADOCtphAM4Ao7bHzgWVF84" "PVTI_lADOCtphAM4Ao7bHzgWVGC0" "PVTI_lADOCtphAM4Ao7bHzgWVF_M"
  "PVTI_lADOCtphAM4Ao7bHzgW2FcU" "PVTI_lADOCtphAM4Ao7bHzgWa394" "PVTI_lADOCtphAM4Ao7bHzgWwNIc"
  "PVTI_lADOCtphAM4Ao7bHzgWwTbo" "PVTI_lADOCtphAM4Ao7bHzglKv08" "PVTI_lADOCtphAM4Ao7bHzglK0dY"
  "PVTI_lADOCtphAM4Ao7bHzglK0eY" "PVTI_lADOCtphAM4Ao7bHzglK0fY" "PVTI_lADOCtphAM4Ao7bHzglK0gA"
)

for old_id in "${OLD_ITEMS[@]}"; do
  gh project item-delete --id "$old_id" --owner "$OWNER"
done

