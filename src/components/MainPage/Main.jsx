import { Container } from "@mui/material"
import { Content } from "./Content/Content"
import { Footer } from "./Footer/Footer"

export const MainComponent = () => {
    return (
        <div>
            <Container>
                <Content />
                <Footer />
            </Container>
        </div>
    )
}