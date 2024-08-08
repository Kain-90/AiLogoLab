from typing import Union

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic import Field
from typing import Generic, TypeVar

T = TypeVar('T')

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

router = APIRouter()

@router.get("/")
def read_root():
    return {"Hello": "World"}


class BaseResponse(BaseModel, Generic[T]):
    code: int = Field(0)
    message: str = Field('')
    data: T | None = Field(None)

class GenLogoCmd(BaseModel):
    text: str
    
class GenLogoRes(BaseModel):
    images: list[str]

@router.post("/gen-logo")
async def gen_logo(cmd: GenLogoCmd) -> BaseResponse[GenLogoRes]:
    return BaseResponse[GenLogoRes](data=GenLogoRes(images=["https://via.placeholder.com/150"]))


app.include_router(router, prefix="/api")