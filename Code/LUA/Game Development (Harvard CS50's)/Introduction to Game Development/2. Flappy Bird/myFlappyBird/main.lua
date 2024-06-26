-- We need this library for the code
push = require 'push'
Class = require 'class'

-- We need this to use the code of the Bird and Pipe classes
require 'Bird'
require 'Pipe'
require 'PipePair'

-- Code related to game state and state machines
require 'StateMachine'
require 'states/BaseState'
require 'states/CountdownState'
require 'states/PlayState'
require 'states/ScoreState'
require 'states/TitleScreenState'

-- Physical screen size
WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 720

-- Virtual window size
VIRTUAL_WIDTH = 512
VIRTUAL_HEIGHT = 288

-- Local is defined to this scope, doesn´t work outside this file
-- Define a background and a foreground for the game and the starting scroll for them
local background = love.graphics.newImage('background.png')
local backgroundScroll = 0

local ground = love.graphics.newImage('ground.png')
local groundScroll = 0

-- The background scrolls slower than the ground, so the ground value needs to be higher
local BACKGROUND_SCROLL_SPEED = 30
local GROUND_SCROLL_SPEED = 60

local BACKGROUND_LOOPING_POINT = 413

-- Scrolling variable to pause the game when we collide with a pipe
local scrolling = true

function love.load()
    -- Using this line for the filtering, in this case nearest
    love.graphics.setDefaultFilter('nearest', 'nearest')

    math.randomseed(os.time())

    -- App Window Title
    love.window.setTitle('Flappy Bird')

    -- Initialize our nice-looking retro text fonts
    smallFont = love.graphics.newFont('font.ttf', 8)
    mediumFont = love.graphics.newFont('flappy.ttf', 14)
    flappyFont = love.graphics.newFont('flappy.ttf', 28)
    hugeFont = love.graphics.newFont('flappy.ttf', 56)
    love.graphics.setFont(flappyFont)

    -- Initialize the table of sounds
    sounds = {
        ['jump'] = love.audio.newSource('jump.wav', 'static'),
        ['explosion'] = love.audio.newSource('explosion.wav', 'static'),
        ['hurt'] = love.audio.newSource('hurt.wav', 'static'),
        ['score'] = love.audio.newSource('score.wav', 'static'),

        -- https://freesound.org/people/xsgianni/sounds/388079/
        ['music'] = love.audio.newSource('marios_way.mp3', 'static')
    }

    -- Start music
    -- Loop the music because the game is infinit
    sounds['music']:setLooping(true)
    sounds['music']:play()

    -- Initialize the Virtual Resolution
    push:setupScreen(VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT, {
        vsync = true,
        fullscreen = false,
        resizable = true
    })
    
    -- Initialize state machine with all state-returning functions
    -- gStateMachine means that stateMachine is a global variable
    gStateMachine = StateMachine {
        ['title'] = function() return TitleScreenState() end,
        ['countdown'] = function() return CountdownState() end,
        ['play'] = function() return PlayState() end,
        ['score'] = function() return ScoreState() end
    }
    gStateMachine:change('title')

    -- initialize input table
    love.keyboard.keysPressed = {}

     -- Initialize mouse input table
     love.mouse.buttonsPressed = {}
end

function love.resize(w, h)
    push:resize(w, h)
end

-- When a key (escape) is pressed do love.event.quit()
function love.keypressed(key)
    love.keyboard.keysPressed[key] = true

    if key == 'escape' then
        love.event.quit()
    end
end

function love.mousepressed(x, y, button)
    love.mouse.buttonsPressed[button] = true
end

function love.keyboard.wasPressed(key)
    return love.keyboard.keysPressed[key]
end

function love.mouse.wasPressed(button)
    return love.mouse.buttonsPressed[button]
end

-- Updates the values of the variables
function love.update(dt)
    -- Update background and ground scroll offsets
    if scrolling then
        backgroundScroll = (backgroundScroll + BACKGROUND_SCROLL_SPEED * dt) % BACKGROUND_LOOPING_POINT
        groundScroll = (groundScroll + GROUND_SCROLL_SPEED * dt) % VIRTUAL_WIDTH
    end

    -- Now, we just update the state machine, which defers to the right state
    gStateMachine:update(dt)

    -- reset input table
    love.keyboard.keysPressed = {}
    love.mouse.buttonsPressed = {}
end

-- Draw the background declared above and the ground also declared above
function love.draw()
    push:start()
        love.graphics.draw(background, -backgroundScroll, 0)

        gStateMachine:render()

        love.graphics.draw(ground, -groundScroll, VIRTUAL_HEIGHT - 16)
    push:finish()
end