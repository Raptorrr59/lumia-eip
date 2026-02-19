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

create_task() {
    TITLE=$1
    STATUS_ID=$2
    BODY=$3
    
    echo "Creating issue: $TITLE"
    # Create the issue in the repository
    ISSUE_URL=$(gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" --json url --jq '.url')
    
    echo "Adding to project..."
    # Add the issue to the project
    ITEM_ID=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "$ISSUE_URL" --format json --jq '.id')
    
    echo "Setting status..."
    # Update the status of the item in the project
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$STATUS_FIELD_ID" --single-select-option-id "$STATUS_ID"
}

# --- DELIVERED TASKS ---
create_task "[BACKEND] Migration from MySQL to MongoDB storage" "$DELIVERED" "Replace relational database with MongoDB for AI training metadata and user stats."
create_task "[INFRA] Multi-service orchestration with Docker Compose" "$DELIVERED" "Define services for Backend, Frontend, and Cluster Manager in a unified environment."
create_task "[SECURITY] Implement BCrypt password hashing for user accounts" "$DELIVERED" "Ensure secure storage of user credentials."
create_task "[BACKEND] REST API for AI script upload and storage" "$DELIVERED" "Endpoints to receive and store user-submitted Python scripts."
create_task "[INFRA] Cluster Manager: Basic container lifecycle management" "$DELIVERED" "Initial implementation of starting/stopping training containers via FastAPI."
create_task "[BACKEND] Detailed User Profile and statistics API" "$DELIVERED" "Retrieve XP, Level, and active training status for the frontend dashboard."
create_task "[INFRA] Automated VPS Deployment setup" "$DELIVERED" "Infrastructure-as-code and scripts for deploying to the production VPS."

# --- CODE REVIEW TASKS ---
create_task "[BACKEND] Global Leaderboard implementation for Snake and Connect4" "$CODE_REVIEW" "Aggregate scores across all users and rank by game performance."
create_task "[BACKEND] Comprehensive API Error Handling and Validation" "$CODE_REVIEW" "Refactor exception handlers to return consistent, localized error messages."

# --- IN PROGRESS TASKS ---
create_task "[BACKEND] Achievement system and reward distribution" "$IN_PROGRESS" "Backend logic for unlocking achievements based on game performance and milestones."
create_task "[TEST] Backend Integration Test suite for AI training flow" "$IN_PROGRESS" "End-to-end testing of script upload -> training -> result collection."

# --- TODO TASKS ---
create_task "[FRONT] Implement interactive training logs viewer" "$TODO" "Allow users to see real-time output from their AI agents via WebSockets."
create_task "[BACKEND] API for platform-wide user reviews and ratings" "$TODO" "Endpoints for submitting and viewing feedback for the Lumia platform."
create_task "[FRONT] Accessibility (a11y) compliance update" "$TODO" "Ensure WCAG 2.1 standards for the landing page and dashboard."
create_task "[BACKEND] Subscription tiers and premium feature gating" "$TODO" "Limit training slots and history based on user subscription status."

