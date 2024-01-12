import pygame
import predict

# Returns the drawing canvas of the screen as a 3D array
def SaveImage():
    screenshot = pygame.Surface((490, 490))
    screenshot.blit(screen, (0, 0), (5, 5, 490, 490))
    return pygame.surfarray.array3d(screenshot)

pygame.init()
screen = pygame.display.set_mode((500, 500))
pygame.display.set_caption('Doodle Recognition')
clock = pygame.time.Clock()
running = True
wipe = True

while running:
    for event in pygame.event.get():
        pos = (pygame.mouse.get_pos())
        # Exit on clicking top right X
        if event.type == pygame.QUIT:
            running = False

        # Draw on left click
        elif (pygame.mouse.get_pressed()[0]):
            pygame.draw.circle(screen, (0, 0, 0), (pos[0], pos[1]), 10, 0)

        # Clear screen on right click
        elif (pygame.mouse.get_pressed()[2]):
            wipe = True

        # Get prediction on middle mouse click
        elif (pygame.mouse.get_pressed()[1]):
            input_img = SaveImage()
            guess = predict.Predict(input_img)
            print(guess)

    if wipe == True:
        screen.fill((255,255,255))
        wipe = False

    # RENDER YOUR GAME HERE
    pygame.draw.rect(screen, (0,0,140), (0,0,500,500), width = 5)

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(1000) # Higher frame rate required for smooth drawing

pygame.quit()