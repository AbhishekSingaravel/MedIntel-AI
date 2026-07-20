from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.user_service import UserService

from app.schemas.user import TokenResponse, UserCreate, UserLogin, UserResponse

from app.services.auth_service import AuthenticationService

from app.dependencies.auth import get_current_user
from app.models.user import User

from fastapi.security import OAuth2PasswordRequestForm

from app.dependencies.auth import require_role
from app.models.enums import UserRole

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """
    service = UserService(db)

    return service.create_user(user)
    
@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Authenticate a user and return a JWT access token.
    """

    service = AuthenticationService(db)

    login_data = UserLogin(
        email=form_data.username,
        password=form_data.password,
    )

    return service.login(login_data)
    
@router.get(
    "/me",
    response_model=UserResponse,
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    """
    Return the currently authenticated user.
    """
    return current_user

@router.get("/admin")
def admin_dashboard(
    current_user: User = Depends(require_role(UserRole.ADMIN)),
):
    """
    Example admin-only endpoint.
    """
    return {
        "message": f"Welcome Admin {current_user.name}"
    }